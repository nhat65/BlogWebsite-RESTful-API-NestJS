import { IsNotEmpty, IsString } from 'class-validator';
import { CommentDto } from './comment.dto';

export class UpdateCommentDto extends CommentDto {
  @IsString()
  @IsNotEmpty({ message: 'Comment id is required' })
  id: string;
}
