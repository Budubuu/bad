import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateShowDto } from './dto/update-show.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';
import { Like, Repository } from 'typeorm';
import { ShowInformation } from './entities/show_information.entity';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ShowsService {
  private s3: S3;
  bucketName: string;

  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
    @InjectRepository(ShowInformation)
    private readonly showInformationRepository: Repository<ShowInformation>,
    private readonly configService: ConfigService,
  ) {
    this.s3 = new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_REGION'),
    });
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
  }

  // async findAll(): Promise<Show[]> {
  //   return await this.showRepository.find({
  //     select: ['id', 'title'],
  //   });
  // }

  async findOne(id: number): Promise<Show> {
    const show = await this.showRepository.findOne({
      where: { id, deletedAt: null },
    });
    if (!show) {
      throw new NotFoundException('없는 공연 입니다.');
    }
    return show;
  }

  async create(updateShowDto: UpdateShowDto, imageFiles: Express.Multer.File[]) {
    if (!imageFiles || imageFiles.length === 0) {
      throw new BadRequestException('적어도 하나의 이미지 파일을 업로드해야 합니다.');
    }

    const imageUrls = await this.uploadImagesToS3(imageFiles);

    const newShow = this.showRepository.create({
      title: updateShowDto.title,
      description: updateShowDto.description,
      category: updateShowDto.category,
      imageUrl: imageUrls[0], // 첫 번째 이미지를 대표 이미지로 사용
      price: updateShowDto.price,
      location: updateShowDto.location,
      totalSeat: updateShowDto.totalSeat,
    });

    const savedShow = await this.showRepository.save(newShow);

    const showInformation = this.showInformationRepository.create({
      showId: savedShow.id,
      showDate: updateShowDto.showDate,
      showTime: updateShowDto.showTime,
      avaliableSeats: updateShowDto.totalSeat,
    });

    await this.showInformationRepository.save(showInformation);
    return savedShow;
  }

  // private async verifyShowById(id: number) {
  //   const show = await this.showRepository.findOneBy({ id });
  //   if (!show) {
  //     throw new NotFoundException('존재하지 않는 공연입니다.');
  //   }

  //   return show;
  // }

  private async uploadImagesToS3(imageFiles: Express.Multer.File[]): Promise<string[]> {
    const uploadPromises = imageFiles.map(async (file) => {
      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `shows/${uuidv4()}-${file.originalname}`,
        Body: file.buffer,
        ACL: 'public-read',
      };

      const result = await this.s3.upload(uploadParams).promise();
      return result.Location;
    });

    return await Promise.all(uploadPromises);
  }

  async getAllShows() {
    return this.showRepository.find({
      select: ['id', 'title'],
    });
  }

  async getShowsByCategory(category: string) {
    return this.showRepository.find({ where: { category } });
  }

  searchShowsByName(name: string) {
    return this.showRepository.find({ where: { title: Like(`%${name}%`) } });
  }
}
