import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../types/userRole.type';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  // @IsString()
  // @IsNotEmpty({ message: '닉네임를 입력해주세요.' })
  // nickname: string;

  // @IsString()
  // @IsNotEmpty({ message: '이름을 입력해주세요.' })
  // name: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;
}