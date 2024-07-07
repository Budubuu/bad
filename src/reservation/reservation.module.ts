import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation } from './entities/reservation.entity';
import { User } from 'src/user/entities/user.entity';
import { Show } from 'src/shows/entities/show.entity';
import { ShowInformation } from 'src/shows/entities/show_information.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, User, Show, ShowInformation])],
  providers: [ReservationService],
  controllers: [ReservationController],
  exports: [ReservationService],
})
export class ReservationModule {}
