import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class SendBirdService {
  private readonly API_TOKEN = process.env.SENDBIRD_API_TOKEN;
  private readonly BASE_URL = `https://api-${process.env.SENDBIRD_APP_ID}.sendbird.com/v3`;

  constructor(private httpService: HttpService) {}

  //사용자 조회
  getUsers(): Observable<AxiosResponse<any>> {
    const url = `${this.BASE_URL}/users`;
    return this.httpService
      .get(url, {
        headers: {
          'Api-Token': this.API_TOKEN,
        },
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          throw new HttpException(error.response?.data || 'SendBird API Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }),
      );
  }

  //사용자 생성
  createUser(userId: string, nickname: string, profileUrl: string): Observable<AxiosResponse<any>> {
    const url = `${this.BASE_URL}/users`;
    const data = {
      user_id: userId,
      nickname: nickname,
      profile_url: profileUrl,
    };
    return this.httpService
      .post(url, data, {
        headers: {
          'Api-Token': this.API_TOKEN,
        },
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          throw new HttpException(error.response?.data || 'SendBird API Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }),
      );
  }

  //메세지 전송
  sendMessage(channelUrl: string, message: string, userId: string): Observable<AxiosResponse<any>> {
    const url = `${this.BASE_URL}/group_channels/${channelUrl}/messages`;
    const data = {
      message_type: 'MESG',
      user_id: userId,
      message: message,
    };
    return this.httpService
      .post(url, data, {
        headers: {
          'Api-Token': this.API_TOKEN,
        },
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          throw new HttpException(error.response?.data || 'SendBird API Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }),
      );
  }

  //채팅방 생성
  createChannel(name: string, userIds: string[]): Observable<AxiosResponse<any>> {
    const url = `${this.BASE_URL}/group_channels`;
    const data = {
      name: name,
      user_ids: userIds,
    };
    return this.httpService
      .post(url, data, {
        headers: {
          'Api-Token': this.API_TOKEN,
        },
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          throw new HttpException(error.response?.data || 'SendBird API Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }),
      );
  }

  //채팅방 종류 조회
  getChannelTypes(): Observable<AxiosResponse<any>> {
    const url = `${this.BASE_URL}/group_channels`;
    return this.httpService
      .get(url, {
        headers: {
          'Api-Token': this.API_TOKEN,
        },
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          throw new HttpException(error.response?.data || 'SendBird API Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }),
      );
  }

  //채팅방 메세지 조회
  getChannelMessages(channelUrl: string, limit: number = 100, messageTs?: number): Observable<AxiosResponse<any>> {
    const url = `${this.BASE_URL}/group_channels/${channelUrl}/messages`;

    // If messageTs is not provided, use current timestamp
    if (!messageTs) {
      messageTs = Math.floor(Date.now() / 1000);
    }

    const params: any = {
      prev_limit: limit,
      include: true,
      reverse: true,
      message_ts: messageTs,
    };

    return this.httpService
      .get(url, {
        headers: {
          'Api-Token': this.API_TOKEN,
        },
        params: params,
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          throw new HttpException(error.response?.data || 'SendBird API Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }),
      );
  }
}
