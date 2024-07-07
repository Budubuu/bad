import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { User } from 'src/user/entities/user.entity';
import { ShowInformation } from 'src/shows/entities/show_information.entity';
import { Show } from 'src/shows/entities/show.entity';
import { Status } from 'src/user/types/reservation.status';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ShowInformation)
    private readonly showInformationRepository: Repository<ShowInformation>,
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
  ) {}

  async createReservation(userId: number, showId: number, showInformationId: number): Promise<Reservation> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('없는 사람입니다.');

    const showInformation = await this.showInformationRepository.findOne({ where: { id: showInformationId } });
    if (!showInformation) throw new NotFoundException('공연 정보가 없습니다.');

    if (showInformation.avaliableSeats <= 0) throw new BadRequestException('남은 좌석이 없습니다.');

    const show = await this.showRepository.findOne({ where: { id: showId } });
    if (!show) throw new NotFoundException('없는 공연입니다.');

    if (user.points < show.price) throw new BadRequestException('포인트가 부족합니다.');

    return await this.reservationRepository.manager.transaction(async (transactionalEntityManager) => {
      user.points -= show.price;
      showInformation.avaliableSeats -= 1;

      await transactionalEntityManager.save(user);
      await transactionalEntityManager.save(showInformation);

      const reservation = new Reservation();
      reservation.user = user;
      reservation.show = show;
      reservation.showInformation = showInformation;
      reservation.status = Status.Reserved;

      return await transactionalEntityManager.save(reservation);
    });
  }

  async getReservations(userId: number): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      relations: ['show', 'showInformation'],
    });
  }
}
