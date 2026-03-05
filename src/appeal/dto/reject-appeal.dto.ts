import { IsNotEmpty, IsString } from 'class-validator';

export class RejectAppealDto {
  @IsNotEmpty({ message: 'Appeal cannot be empty' })
  @IsString()
  appealId: string;
}
