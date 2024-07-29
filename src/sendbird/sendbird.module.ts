import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SendBirdService } from './sendbird.service';
import { SendBirdController } from './sendbird.controller';

@Module({
  imports: [HttpModule],
  providers: [SendBirdService],
  controllers: [SendBirdController],
})
export class SendBirdModule {}
