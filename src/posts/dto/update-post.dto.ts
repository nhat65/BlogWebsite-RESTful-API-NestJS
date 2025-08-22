import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  Length,
  MinLength,
  IsNumber,
} from 'class-validator';

export class UpdatePostDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @Length(3, 100, { message: 'Title must be between 3 and 100 characters' })
  title: string;

  @IsString({ message: 'Slug must be a string' })
  @IsOptional()
  @Matches(/^[a-z0-9\-:?!.,()'" ]+$/i, {
    message: 'Slug must be lowercase letters, numbers, and hyphens only.',
  })
  slug: string;

  @IsString()
  @IsNotEmpty({ message: 'Content is required' })
  @MinLength(10, { message: 'Content must be at least 10 characters' })
  content: string;

  @IsNumber()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsNotEmpty({ message: 'Tag is required' })
  tagId: number;

  @IsOptional()
  @IsString()
  imageUrl: string;
}
