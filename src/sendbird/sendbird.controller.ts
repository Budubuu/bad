import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SendBirdService } from './sendbird.service';

@Controller('sendbird')
export class SendBirdController {
  constructor(private sendBirdService: SendBirdService) {}

  //사용자 조회
  @Get('users')
  getUsers() {
    return this.sendBirdService.getUsers();
  }

  //사용사 생성
  @Post('users')
  createUser(
    @Body('userId') userId: string,
    @Body('nickname') nickname: string,
    @Body('profileUrl') profileUrl: string,
  ) {
    return this.sendBirdService.createUser(userId, nickname, profileUrl);
  }

  //메세지 전송
  @Post('messages')
  sendMessage(
    @Body('channelUrl') channelUrl: string,
    @Body('message') message: string,
    @Body('userId') userId: string,
  ) {
    return this.sendBirdService.sendMessage(channelUrl, message, userId);
  }

  //채팅방 생성
  @Post('channels')
  createChannel(@Body('name') name: string, @Body('userIds') userIds: string[]) {
    return this.sendBirdService.createChannel(name, userIds);
  }

  //채팅방 종류 조회
  @Get('channels')
  getChannelTypes() {
    return this.sendBirdService.getChannelTypes();
  }

  //채팅방 메세지 조회
  @Get('messages')
  getChannelMessages(
    @Query('channelUrl') channelUrl: string,
    @Query('limit') limit?: number,
    @Query('messageTs') messageTs?: number,
  ) {
    return this.sendBirdService.getChannelMessages(channelUrl, limit, messageTs);
  }
}
