import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
  Logger,
  Inject,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Account } from '../entities/account.entity';
import { LoginDto } from 'src/dto/login.dto';
import { RegisterDto } from 'src/dto/register.dto';
import { Role } from 'src/constant/enum';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    try {
      const account = await this.accountRepository.findOne({
        where: { username },
        select: ['id', 'username', 'password', 'email', 'role'],
      });
      if (!account) {
        this.logger.warn(`Login failed - Account not found: ${username}`);
        throw new UnauthorizedException('Account not found!');
      }

      const isPasswordValid = await bcrypt.compare(password, account.password);
      if (!isPasswordValid) {
        this.logger.warn(
          `Login failed - Invalid password for account: ${username}`,
        );
        throw new UnauthorizedException('Invalid password for account!');
      }

      const payload = {
        sub: account.id,
        username: account.username,
        role: account.role,
      };
      const accessToken = this.jwtService.sign(payload);
      await this.cacheManager.set(
        `token:${account.id}`,
        accessToken,
        3600 * 1000,
      );

      return {
        status: true,
        accessToken,
        user: {
          id: account.id,
          email: account.email,
          role: account.role,
        },
      };
    } catch (error) {
      this.logger.error(`Login error: ${error.message}`, error.stack);
      if (
        error instanceof UnauthorizedException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Login failed');
    }
  }

  async register(registerDto: RegisterDto) {
    const { email, username, password, confirmPassword } = registerDto;
    if (password !== confirmPassword) {
      throw new BadRequestException(
        'Password must match confirmation password',
      );
    }

    try {
      return await this.dataSource.transaction(
        async (transactionalEntityManager) => {
          const accountRepo = transactionalEntityManager.getRepository(Account);
          const existingAccount = await accountRepo.findOne({
            where: [{ email }, { username }],
          });

          if (existingAccount) {
            const conflictField =
              existingAccount.email === email ? 'Email' : 'Username';
            throw new ConflictException(`${conflictField} has been used`);
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          const newAccount = accountRepo.create({
            email,
            username,
            password: hashedPassword,
            role: Role.USER,
            createdAt: new Date(),
          });

          await accountRepo.save(newAccount);
          this.logger.log(`New account registered: ${username}`);

          return {
            status: true,
            message: 'Register successfully.',
          };
        },
      );
    } catch (error) {
      this.logger.error(`Registration error: ${error.message}`, error.stack);
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Registration failed');
    }
  }

  async logout(userId: number) {
    await this.cacheManager.del(`token:${userId}`);
    return { message: 'Logout successfully.' };
  }
}
