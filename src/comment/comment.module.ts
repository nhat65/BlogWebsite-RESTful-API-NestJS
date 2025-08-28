import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Comment } from 'src/entities/comment.entity';
import { User } from 'src/entities/user.entity';
import { Post } from 'src/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, User, Post]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
