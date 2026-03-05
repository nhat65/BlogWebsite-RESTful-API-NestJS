import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UploadImageInterceptor } from 'src/common/interceptor/upload-file.interceptor';
import { FileSizeValidationPipe } from 'src/common/pipe/fileValidation.pipe';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  async getAll() {
    return this.postService.getAll();
  }

  @Get('/:slug')
  async getDetail(@Param('slug') slug: string) {
    return this.postService.getDetailBySlug(slug);
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(UploadImageInterceptor('image'))
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile(FileSizeValidationPipe) file: Express.Multer.File,
    @Req() request: Request,
  ) {
    const accountId = request['user'].sub;
    return this.postService.create(accountId, createPostDto, file);
  }

  @Put('/update/:slug')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(UploadImageInterceptor('image'))
  async update(
    @Param('slug') slug: string,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFile(FileSizeValidationPipe) file: Express.Multer.File,
    @Req() request: Request,
  ) {
    const accountId = request['user'].sub;
    return this.postService.update(accountId, slug, updatePostDto, file);
  }
}
