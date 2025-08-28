import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetPostCommentDto } from './dto/get-post-comment.dto';

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
}
