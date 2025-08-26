import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appeal } from 'src/entities/appeal.entity';
import { User } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateAppealDto } from './dto/create-appeal.dto';
import { Post } from 'src/entities/post.entity';
import { AppealStatus, AppealType } from 'src/constant/enum';
import { MailService } from 'src/mail/mail.service';
import { RejectAppealDto } from './dto/reject-appeal.dto';
import { ResolveAppealDto } from './dto/resolve-appeal.dto';

@Injectable()
export class AppealService {
  constructor(
    @InjectRepository(Appeal)
    private readonly appealRepository: Repository<Appeal>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly dataSource: DataSource,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly mailService: MailService,
  ) {}

  async createPostAppeal(accountId: string, createAppealDto: CreateAppealDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { accountId },
        select: ['id'],
      });
      if (!user) {
        throw new NotFoundException('User not found.');
      }

      const post = await this.postRepository.findOne({
        where: { id: createAppealDto.postId },
      });
      if (!post) {
        throw new NotFoundException('Post not found');
      }

      const createPayload = { ...createAppealDto, userId: user.id };
      await this.appealRepository.save(createPayload);
      return {
        status: true,
        message: 'Create post appeal successfully.',
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Create post appeal failed!');
    }
  }

  async getUserAppeal(accountId: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { accountId },
        select: ['id'],
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const result = await this.appealRepository.find({
        where: { userId: user.id },
      });
      return {
        status: true,
        message: 'Get appeal successfully!',
        data: result,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Get appeal failed');
    }
  }

  async getAll() {
    try {
      const result = await this.appealRepository.find();
      return {
        status: true,
        message: 'Get all appeal successfully',
        data: result,
      };
    } catch (error) {
      throw new BadRequestException('Get all failed');
    }
  }

  async rejectAppeal(rejectAppealDto: RejectAppealDto, accountId: string) {
    try {
      const adminUser = await this.userRepository.findOne({
        where: { accountId },
        select: ['id'],
      });
      if (!adminUser) {
        throw new NotFoundException('User not found');
      }

      const appeal = await this.appealRepository.findOne({
        where: { id: rejectAppealDto.appealId },
        relations: {
          user: {
            account: true,
          },
        },
        select: {
          id: true,
          postId: true,
          user: {
            fullName: true,
            account: {
              email: true,
            },
          },
        },
      });
      if (!appeal) {
        throw new NotFoundException('Appeal not found');
      }

      const post = await this.postRepository.findOne({
        where: { id: appeal.postId },
        select: ['title'],
      });
      if (!post) {
        throw new NotFoundException('Post not found');
      }

      const updatePayload = {
        ...appeal,
        status: AppealStatus.REJECTED,
        resolvedBy: adminUser.id,
      };
      await this.appealRepository.save(updatePayload);
      await this.mailService.sendRejectAppealEmail({
        email: appeal.user.account.email,
        fullName: appeal.user.fullName,
        postTitle: post.title,
      });
      return {
        status: true,
        message: 'Reject appeal successfully.',
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Reject appeal failed');
    }
  }
  async resolveAppeal(resolveAppealDto: ResolveAppealDto, accountId: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { accountId },
        select: ['id'],
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const appeal = await this.appealRepository.findOne({
        where: { id: resolveAppealDto.appealId },
        relations: {
          user: {
            account: true,
          },
        },
        select: {
          id: true,
          postId: true,
          user: {
            fullName: true,
            account: {
              email: true,
            },
          },
        },
      });
      if (!appeal) {
        throw new NotFoundException('Appeal not found');
      }

      const post = await this.postRepository.findOne({
        where: { id: appeal.postId },
        select: ['title'],
      });
      if (!post) {
        throw new NotFoundException('Post not found');
      }

      const updatePayload = {
        ...appeal,
        status: AppealStatus.RESOLVED,
        resolvedBy: user.id,
      };
      await this.appealRepository.save(updatePayload);
      await this.mailService.sendResolveAppealEmail({
        email: appeal.user.account.email,
        fullName: appeal.user.fullName,
        postTitle: post.title,
      });
      return {
        status: true,
        message: 'Resolve appeal successfully.',
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Resolve appeal failed');
    }
  }
}
