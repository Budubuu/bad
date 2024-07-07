import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';

import { UpdateShowDto } from './dto/update-show.dto';
import { ShowsService } from './shows.service';
import { GetShowsDto } from './dto/get-show.dto';

@UseGuards(RolesGuard)
@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowsService) {}

  // @Get()
  // async findAll() {
  //   return await this.showService.findAll();
  // }

  @Get()
  async getAllShows(@Body('category') getShowsDto: GetShowsDto) {
    if (getShowsDto.category) {
      return this.showService.getShowsByCategory(getShowsDto.category);
    }
    return this.showService.getAllShows();
  }

  @Get('search')
  async searchShows(@Body('name') name: string) {
    return this.showService.searchShowsByName(name);
  }

  @Roles(Role.Admin)
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 10 }]))
  async create(@Body() updateShowDto: UpdateShowDto, @UploadedFiles() files: { files?: Express.Multer.File[] }) {
    return await this.showService.create(updateShowDto, files.files);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.showService.findOne(id);
  }
}
