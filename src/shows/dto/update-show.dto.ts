import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateShowDto {
  @IsString()
  @IsNotEmpty({ message: '제목을 입력해주세요.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '제목에 대한 소개를 입력해주세요.' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: '카테고리를 입력해주세요.' })
  category: string;

  //   @IsString()
  //   @IsNotEmpty({ message: '사진이 없습니다.' })
  //   imageUrl: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: '가격을 입력해주세요.' })
  price: number;

  @IsString()
  @IsNotEmpty({ message: '공연 장소를 입력해주세요.' })
  location: string;

  @IsString()
  @IsNotEmpty({ message: '공연 날짜를 입력해주세요.' })
  showDate: string;

  @IsString()
  @IsNotEmpty({ message: '공연 시간을 입력해주세요.' })
  showTime: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: '총 좌석수를 입력해주세요.' })
  totalSeat: number;
}
