import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CommentDto {
  @Transform(({ value }) => value?.toString())
  @Transform(({ value }) => value?.trim())
  @IsString({ message: 'Content must be a string' })
  @IsNotEmpty({ message: 'Content is required' })
  @Length(1, 200, { message: 'Content must be between 1 and 200 characters' })
  content: string;

  @IsString()
  @IsNotEmpty({ message: 'Post id is required' })
  postId: string;

  @IsString()
  @IsOptional()
  parentId: string;
}
