import { PostStatus } from 'src/constant/enum';
import { PostDto } from './post.dto';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  MinDate,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePostDto extends PostDto {
  @IsString()
  @IsOptional()
  status: PostStatus;

  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : undefined), {
    toClassOnly: true,
  })
  @MinDate(new Date(), { message: 'Publish date must be in the future' })
  @IsOptional()
  publishAt: Date;

  @IsNumber()
  @IsOptional()
  userId: number;
}
