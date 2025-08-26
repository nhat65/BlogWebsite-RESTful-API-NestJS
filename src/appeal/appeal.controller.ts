import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AppealService } from './appeal.service';
import { CreateAppealDto } from './dto/create-appeal.dto';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/constant/enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RejectAppealDto } from './dto/reject-appeal.dto';
import { ResolveAppealDto } from './dto/resolve-appeal.dto';

@Controller('appeal')
@UseGuards(JwtAuthGuard)
export class AppealController {
  constructor(private readonly appealService: AppealService) {}

  @Post('post')
  createPostAppeal(
    @Body() createAppealDto: CreateAppealDto,
    @Req() request: Request,
  ) {
    const accountId = request['user'].sub;
    return this.appealService.createPostAppeal(accountId, createAppealDto);
  }

  @Get('/me')
  getUserAppeal(@Req() request: Request) {
    const accountId = request['user'].sub;
    return this.appealService.getUserAppeal(accountId);
  }

  @Get('/')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  getAllAppeal() {
    return this.appealService.getAll();
  }

  @Post('reject')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  rejectAppeal(
    @Req() request: Request,
    @Body() rejectAppealDto: RejectAppealDto,
  ) {
    const accountId = request['user'].sub;
    return this.appealService.rejectAppeal(rejectAppealDto, accountId);
  }

  @Post('resolve')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  resolveAppeal(
    @Req() request: Request,
    @Body() resolveAppealDtp: ResolveAppealDto,
  ) {
    const accountId = request['user'].sub;
    return this.appealService.resolveAppeal(resolveAppealDtp, accountId);
  }
}
