import { IsNotEmpty, IsString } from 'class-validator';
import { AppealDto } from './appeal.dto';

export class CreateAppealDto extends AppealDto {
  @IsString()
  @IsNotEmpty({ message: 'Post Id is requied' })
  postId: string;
}
