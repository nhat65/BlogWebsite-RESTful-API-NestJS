import { IsNotEmpty, IsNumber } from 'class-validator';
import { AppealDto } from './appeal.dto';

export class CreateAppealDto extends AppealDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Post Id is requied' })
  postId: number;
}
