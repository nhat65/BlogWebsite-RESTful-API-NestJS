import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { FileSizeValidationPipe } from 'src/common/pipe/fileValidation.pipe';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [PostController],
  providers: [PostService, FileSizeValidationPipe],
})
export class PostModule {}
