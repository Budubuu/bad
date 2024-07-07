import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Show } from './entities/show.entity';
import { ShowInformation } from './entities/show_information.entity';
import { ShowsService } from './shows.service';
import { ShowController } from './shows.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Show, ShowInformation])],
  providers: [ShowsService],
  controllers: [ShowController],
})
export class ShowsModule {}
