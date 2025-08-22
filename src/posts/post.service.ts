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
import { Post } from 'src/entities/post.entity';
import { DataSource, Like, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { generateSlug } from 'src/common/utils/slug';
import { User } from 'src/entities/user.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostStatus } from 'src/constant/enum';
import { PostReaction } from 'src/entities/post-reaction.entity';
import { Comment } from 'src/entities/comment.entity';
import multer from 'multer';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  private readonly CACHE_KEY_ALL_POST = 'all_post';
  private readonly CACHE_TTL = 3600 * 1000;

  async getAll() {
    try {
      const cachedPosts = await this.cacheManager.get<Post[]>(
        this.CACHE_KEY_ALL_POST,
      );
      if (cachedPosts) {
        return {
          status: true,
          message:
            cachedPosts.length > 0
              ? 'Get all post from cache successfully!'
              : 'No post found in cache',
          data: cachedPosts,
        };
      }

      const posts = await this.postRepository.find({
        where: { status: PostStatus.POSTED },
        relations: { user: true, tag: true },
        select: {
          id: true,
          slug: true,
          title: true,
          imageUrl: true,
          publishAt: true,
          user: {
            id: true,
            fullName: true,
            avatarUrl: true,
          },
          tag: {
            slug: true,
          },
        },
        order: {
          publishAt: 'DESC',
        },
      });
      await this.cacheManager.set(
        this.CACHE_KEY_ALL_POST,
        posts,
        this.CACHE_TTL,
      );

      return {
        status: true,
        message: 'Get all post successfully!',
        data: posts,
      };
    } catch (error) {
      this.logger.error(`Get all post error: ${error.message}`, error.stack);
      throw new BadRequestException('Get all post failed.');
    }
  }

  async getDetailBySlug(slug: string) {
    try {
      const cachedPostDetail = await this.cacheManager.get(`post_${slug}`);
      if (cachedPostDetail) {
        return {
          status: true,
          message: cachedPostDetail
            ? 'Get post detail from cache successfully!'
            : 'No post found in cache',
          data: cachedPostDetail,
        };
      }

      const postDetail = await this.postRepository.findOne({
        relations: { user: true, tag: true },
        where: { slug },
        select: {
          id: true,
          title: true,
          publishAt: true,
          imageUrl: true,
          content: true,
          user: {
            fullName: true,
            avatarUrl: true,
          },
          tag: {
            id: true,
            tagName: true,
          },
        },
      });
      if (!postDetail) {
        this.logger.warn('Get post detail failed - Post not found.');
        throw new NotFoundException('Post not found.');
      }

      await this.cacheManager.set(`post_${slug}`, postDetail, this.CACHE_TTL);

      return {
        status: true,
        message: 'Get post detail successfully!',
        data: postDetail,
      };
    } catch (error) {
      this.logger.error(`Get detail post error: ${error.message}`, error.stack);
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Get post detail failed.');
    }
  }

  async create(
    accountId: number,
    createPostDto: CreatePostDto,
    file: Express.Multer.File,
  ) {
    try {
      createPostDto.imageUrl = file
        ? `/uploads/account_${accountId}/${file.filename}`
        : '';

      const user = await this.userRepository.findOne({
        select: ['id'],
        where: { accountId },
      });
      if (!user) {
        throw new BadRequestException('User not found.');
      }
      createPostDto.userId = user.id;

      if (!createPostDto.slug) {
        createPostDto.slug = generateSlug(createPostDto.title);

        const existingSlugs = await this.postRepository.find({
          select: ['slug'],
          where: { slug: Like(`${createPostDto.slug}%`) },
        });
        if (existingSlugs.length) {
          createPostDto.slug = generateSlug(
            createPostDto.slug,
            existingSlugs.map((post) => post.slug),
          );
        }
      } else {
        const existingSlugs = await this.postRepository.findOne({
          select: ['slug'],
          where: { slug: createPostDto.slug },
        });
        if (existingSlugs) {
          this.logger.error('Create post failed - Slug already exited');
          throw new ConflictException('Slug already existed');
        }
      }

      await this.postRepository.save(createPostDto);

      return {
        status: true,
        message: 'Create post successfully.',
      };
    } catch (error) {
      this.logger.error(`Create post error: ${error.message}`, error.stack);
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Create post failed.');
    }
  }

  async update(
    accountId: number,
    slug: string,
    updatePostDto: UpdatePostDto,
    file: Express.Multer.File,
  ) {
    try {
      updatePostDto.imageUrl = file
        ? `/uploads/account_${accountId}/${file.filename}`
        : '';

      const user = await this.userRepository.findOne({ where: { accountId } });
      if (!user) {
        throw new NotFoundException('User not found.');
      }

      const post = await this.postRepository.findOne({
        where: { slug, userId: user.id },
      });
      if (!post) {
        throw new NotFoundException('Post not found - unauthorized');
      }

      if (!updatePostDto.slug) {
        updatePostDto.slug = generateSlug(updatePostDto.title);
        const existingSlugs = await this.postRepository.find({
          select: ['slug'],
          where: { slug: Like(`${updatePostDto.slug}%`) },
        });
        if (existingSlugs.length) {
          updatePostDto.slug = generateSlug(
            updatePostDto.slug,
            existingSlugs.map((post) => post.slug),
          );
        }
      }

      const existingSlugs = await this.postRepository.find({
        select: ['slug'],
        where: { slug: Like(`${updatePostDto.slug}%`) },
      });
      if (existingSlugs.length) {
        this.logger.error('Update post failed - Slug already exited');
        throw new ConflictException('Slug already existed');
      }

      const updatePost = { ...post, ...updatePostDto };
      await this.postRepository.save(updatePost);
      return {
        status: true,
        message: 'Update post successfully.',
      };
    } catch (error) {
      this.logger.error(`Update post error: ${error.message}`, error.stack);
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Update post failed.');
    }
  }

  async delete(accountId: number, postId: number) {
    try {
      return await this.dataSource.transaction(
        async (transactionalEntityManager) => {
          const user = await transactionalEntityManager.findOne(User, {
            where: { accountId },
            select: ['id'],
          });

          await transactionalEntityManager.softDelete(Comment, {
            postId,
          });

          await transactionalEntityManager.softDelete(PostReaction, {
            postId,
          });

          await transactionalEntityManager.softDelete(Report, {
            postId,
          });

          const postResult = await transactionalEntityManager.softDelete(Post, {
            id: postId,
            userId: user?.id,
          });

          if (!postResult.affected || postResult.affected === 0) {
            throw new NotFoundException('Post not found - unauthorized');
          }
          return {
            status: true,
            message: 'Delete post successfully',
          };
        },
      );
    } catch (error) {
      this.logger.error(`Delete post failed: ${error.message}`, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Delete post failed');
    }
  }
}
