import { IsNotEmpty, IsString } from 'class-validator';

export class GetPostCommentDto {
  @IsString()
  @IsNotEmpty({ message: 'Post id is required' })
  postId: string;
}
