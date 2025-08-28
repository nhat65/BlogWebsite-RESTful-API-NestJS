import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { CacheModule } from '@nestjs/cache-manager';
import { UserModule } from './users/user.module';
import { PostModule } from './posts/post.module';
import { PaypalModule } from './paypal/paypal.module';
import { AppealModule } from './appeal/appeal.module';
import { MailModule } from './mail/mail.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRoot(databaseConfig),
    CacheModule.register({
      isGlobal: true,
    }),
    UserModule,
    PostModule,
    PaypalModule,
    AppealModule,
    MailModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
