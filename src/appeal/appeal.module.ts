import { Module } from '@nestjs/common';
import { AppealController } from './appeal.controller';
import { AppealService } from './appeal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appeal } from 'src/entities/appeal.entity';
import { User } from 'src/entities/user.entity';
import { Post } from 'src/entities/post.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appeal, User, Post]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    MailModule,
  ],
  controllers: [AppealController],
  providers: [AppealService, MailService],
})
export class AppealModule {}
