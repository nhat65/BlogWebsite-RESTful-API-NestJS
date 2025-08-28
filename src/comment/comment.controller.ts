import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetPostCommentDto } from './dto/get-post-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  createComment(
    @Req() request: Request,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const accountId = request['user'].sub;
    return this.commentService.createComment(accountId, createCommentDto);
  }

  @Get('/')
  getAll(@Body() getPostCommentDto: GetPostCommentDto) {
    return this.commentService.getAll(getPostCommentDto);
  }

  @Get('/reply/:parentId')
  getReplyComments(@Param('parentId') parentId: string) {
    return this.commentService.getReplyComments(parentId);
  }

  @Post('/update')
  @UseGuards(JwtAuthGuard)
  updateComment(
    @Req() request: Request,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const accountId = request['user'].sub;
    return this.commentService.updateComment(accountId, updateCommentDto);
  }
}
