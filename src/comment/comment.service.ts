import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from 'src/entities/user.entity';
import { Post } from 'src/entities/post.entity';
import { GetPostCommentDto } from './dto/get-post-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly dataSource: DataSource,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async createComment(accountId: string, createCommentDto: CreateCommentDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { accountId },
        select: ['id'],
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const post = await this.postRepository.findOne({
        where: { id: createCommentDto.postId },
        select: ['id'],
      });
      if (!post) {
        throw new NotFoundException('Post not found');
      }

      if (createCommentDto.parentId) {
        const parentComment = await this.commentRepository.findOne({
          where: { id: createCommentDto.parentId },
          select: ['id'],
        });
        if (!parentComment) {
          throw new NotFoundException('Parent comment not found');
        }
      }

      const result = await this.commentRepository.save({
        ...createCommentDto,
        userId: user.id,
      });
      return {
        status: true,
        message: 'Comment created successfully',
        data: result,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Create comment failed');
    }
  }

  async getAll(getPostCommentDto: GetPostCommentDto) {
    try {
      const post = await this.postRepository.findOne({
        where: { id: getPostCommentDto.postId },
        select: ['id'],
      });
      if (!post) {
        throw new NotFoundException('Post not found');
      }

      const comments = await this.commentRepository.find({
        where: { postId: getPostCommentDto.postId },
        relations: ['user'],
        order: { createdAt: 'DESC' },
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            id: true,
            fullName: true,
            avatarUrl: true,
          },
        },
      });
      return {
        status: true,
        message: 'Get all comments successfully',
        data: comments,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Get all comments failed');
    }
  }

  async getReplyComments(parentId: string) {
    try {
      const result = await this.commentRepository.find({
        where: { id: parentId },
        relations: ['user'],
        select: {
          id: true,
          content: true,
          createdAt: true,
          parentId: true,
          user: {
            id: true,
            fullName: true,
            avatarUrl: true,
          },
        },
      });
      return {
        status: true,
        message: 'Get reply comments successfully',
        data: result,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Get reply comments failed');
    }
  }

  async updateComment(accountId: string, updateCommentDto: UpdateCommentDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { accountId },
        select: ['id'],
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const post = await this.postRepository.findOne({
        where: { id: updateCommentDto.postId },
        select: ['id'],
      });
      if (!post) {
        throw new NotFoundException('Post not found');
      }

      if (updateCommentDto.parentId) {
        const parentComment = await this.commentRepository.findOne({
          where: { id: updateCommentDto.parentId },
          select: ['id'],
        });
        if (!parentComment) {
          throw new NotFoundException('Parent comment not found');
        }
      }

      const comment = await this.commentRepository.findOne({
        where: { id: updateCommentDto.id },
      });
      if (!comment) {
        throw new NotFoundException('Comment not found');
      }

      const updatePayload = { ...comment, ...updateCommentDto };
      const result = await this.commentRepository.save(updatePayload);
      return {
        status: true,
        message: 'Update comment successfully',
        data: result,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Update comment failed');
    }
  }

  async deleteComment(accountId: string, id: string) {
    try {
      return await this.dataSource.transaction(
        async (transactionalEntityManager) => {
          const user = await transactionalEntityManager.findOne(User, {
            where: { accountId },
            select: ['id'],
          });
          if (!user) {
            throw new NotFoundException('User not found');
          }

          const comment = await transactionalEntityManager.findOne(Comment, {
            where: { id },
            select: ['id', 'parentId'],
          });
          if (comment?.parentId) {
            const result = await transactionalEntityManager.delete(Comment, {
              id,
              userId: user?.id,
            });
            if (!result.affected || result.affected === 0) {
              throw new NotFoundException('Comment not found - unauthorized');
            }
            return {
              status: true,
              message: 'Delete comment successfully',
            };
          }

          await transactionalEntityManager.delete(Comment, {
            parentId: id,
          });
          const result = await transactionalEntityManager.delete(Comment, {
            id,
            userId: user?.id,
          });
          if (!result.affected || result.affected === 0) {
            throw new NotFoundException('Comment not found - unauthorized');
          }
          return {
            status: true,
            message: 'Delete comment successfully',
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
      throw new BadRequestException('Delete comment failed');
    }
  }
}
