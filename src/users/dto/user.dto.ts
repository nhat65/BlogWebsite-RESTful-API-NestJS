import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsString({ message: 'Full name must be a string' })
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @IsString({ message: 'Bio must be a string' })
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsString({ message: 'Country must be a string' })
  country: string;
}
