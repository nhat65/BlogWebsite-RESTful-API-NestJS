import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/constant/enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UploadImageInterceptor } from 'src/common/interceptor/upload-file.interceptor';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { FileSizeValidationPipe } from 'src/common/pipe/fileValidation.pipe';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async getAll() {
    return await this.userService.getAll();
  }

  @Get('profile')
  async getProfile(@Req() request: Request) {
    const accountId = request['user'].sub;
    return this.userService.getProfile(accountId);
  }

  @Put('update')
  @UseInterceptors(UploadImageInterceptor('image'))
  async updateProfile(
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile(FileSizeValidationPipe) file: Express.Multer.File,
    @Req() request: Request,
  ) {
    const accoundId = request['user'].sub;
    return this.userService.updateProfile(accoundId, updateUserDto, file);
  }

  @Post('create')
  @UseInterceptors(UploadImageInterceptor('image'))
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile(FileSizeValidationPipe) file: Express.Multer.File,
    @Req() request: Request,
  ) {
    const accoundId = request['user'].sub;
    return this.userService.createUser(accoundId, createUserDto, file);
  }
}
