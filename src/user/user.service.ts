import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { Repository } from 'typeorm';

import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { Role } from './types/userRole.type';
import { access } from 'fs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string, nickname: string, name: string,) {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(
        '이미 해당 이메일로 가입된 사용자가 있습니다!',
      );
    }

    const hashedPassword = await hash(password, 10);
    await this.userRepository.save({
      email,
      password: hashedPassword,
      nickname,
      name,
      points: 1000000,
      role: Role.User,
    });
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'password'],
      where: { email },
    });
    if (_.isNil(user)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    const payload = { email, sub: user.id };
    const accessToken = this.jwtService.sign(payload, {expiresIn: '10m'})
    const refreshToken = this.jwtService.sign(payload, {expiresIn: '1h'})
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    try {
        const payload = this.jwtService.verify(refreshToken);
        const user = await this.findByEmail(payload.email);
        if (_.isNil(user)) {
            throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.')
        }

        const newPayload = {email: user.email, sub: user.id, role: user.role};
        const newAccessToken = this.jwtService.sign(newPayload, {expiresIn: '10m'});

        return {
            access_token: newAccessToken,
        };
    } catch (e) {
        throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
    }
  }

  async findOne(id: number) {
    return await this.findByid(id);
  }

  async findByid(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}