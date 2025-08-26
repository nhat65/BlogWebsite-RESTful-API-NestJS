import { IsNotEmpty, IsNumber } from 'class-validator';

export class RejectAppealDto {
  @IsNotEmpty({ message: 'Appeal cannot be empty' })
  @IsNumber()
  appealId: number;
}
