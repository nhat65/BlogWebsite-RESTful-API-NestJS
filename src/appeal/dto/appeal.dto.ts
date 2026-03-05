import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AppealType } from 'src/constant/enum';

export class AppealDto {
  @IsEnum(AppealType, {
    message: `Type must be one of: ${Object.values(AppealType).join(', ')}`,
  })
  @IsNotEmpty({ message: 'Type must be selected.' })
  type: AppealType;

  @IsString({ message: 'Reason must be a string' })
  @IsNotEmpty({ message: 'Reasonn must be selected' })
  reason: string;

  @IsString({ message: 'Message must be a string' })
  @IsOptional()
  message: string;
}
