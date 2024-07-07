import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ReservationDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: '유저정보를 입력해주세요.' })
  userId: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: '공연아이디를 입력해주세요.' })
  showId: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: '공연정보아이디를를 입력해주세요.' })
  showInformationId: number;
}
