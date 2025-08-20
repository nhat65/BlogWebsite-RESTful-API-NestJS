import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Account } from 'src/entities/account.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  private readonly CACHE_KEY_ALL_USER = 'all_users';
  private readonly CACHE_TTL = 3600 * 1000;

  async getAll() {
    try {
      const cachedUsers = await this.cacheManager.get<User[]>(
        this.CACHE_KEY_ALL_USER,
      );
      if (cachedUsers) {
        return {
          status: true,
          message:
            cachedUsers.length > 0
              ? 'Get all users from cache successfully!'
              : 'No users found in cache',
          data: cachedUsers,
        };
      }

      const users = await this.userRepository.find();
      await this.cacheManager.set(
        this.CACHE_KEY_ALL_USER,
        users,
        this.CACHE_TTL,
      );

      return {
        status: true,
        message:
          users.length > 0 ? 'Get all users successfully!' : 'No users found',
        data: users,
      };
    } catch (error) {
      this.logger.error(`Get all users error: ${error.message}`, error.stack);
      throw new BadRequestException('Failed to retrieve users');
    }
  }

  async getProfile(userId: number) {
    try {
      const cachedProfile = await this.cacheManager.get<User>(`user_${userId}`);
      if (cachedProfile) {
        return {
          status: true,
          message: 'Get profile from cache successfully!',
          data: cachedProfile,
        };
      }

      const userProfile = await this.userRepository.findOne({
        where: { accountId: userId },
        select: ['fullName', 'bio', 'avatarUrl', 'country', 'joinedAt'],
      });
      if (!userProfile) {
        this.logger.warn('Get profile failed - Profile not found.');
        throw new NotFoundException('Profile not found.');
      }
      await this.cacheManager.set(
        `user_${userId}`,
        userProfile,
        this.CACHE_TTL,
      );

      return {
        status: true,
        message: 'Get profile successfully!',
        data: userProfile,
      };
    } catch (error) {
      this.logger.error(`Get profile error: ${error.message}`, error.stack);
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Failed to get profile');
    }
  }

  async updateProfile(userId: number, updateData: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { accountId: userId },
      });
      if (!user) {
        this.logger.warn('Update profile failed - User not found.');
        throw new NotFoundException('User not found.');
      }
      const updateUser = { ...user, ...updateData };
      const result = await this.userRepository.save(updateUser);

      await this.cacheManager.del(`user_${userId}`);

      return {
        status: true,
        message: 'Profile updated successfully!',
        data: result,
      };
    } catch (error) {
      this.logger.error(`Update profile error: ${error.message}`, error.stack);
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Update profile failed.');
    }
  }

  async createUser(accoundId: number, createData: CreateUserDto) {
    try {
      return await this.dataSource.transaction(
        async (transactionalEntityManager) => {
          const accountRepo = transactionalEntityManager.getRepository(Account);
          const userRepo = transactionalEntityManager.getRepository(User);
          const { fullName, bio, avatarUrl, country } = createData;

          const existingAccount = await accountRepo.findOne({
            where: { id: accoundId },
          });
          if (!existingAccount) {
            this.logger.warn('Create user faild - Account not found.');
            throw new NotFoundException(`Account not found.`);
          }

          const newUser = userRepo.create({
            accountId: accoundId,
            fullName: fullName || '',
            bio: bio,
            avatarUrl: avatarUrl,
            country: country,
          });
          const savedUser = await userRepo.save(newUser);
          await this.cacheManager.set(
            `user_${accoundId}`,
            newUser,
            this.CACHE_TTL,
          );

          return {
            status: true,
            message: 'Create user successfully',
            data: savedUser,
          };
        },
      );
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Create user failed');
    }
  }
}
