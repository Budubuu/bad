import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetShowsDto {
  @IsOptional()
  @IsString({ message: '카테고리를 입력해주세요.' })
  category?: string;
}
