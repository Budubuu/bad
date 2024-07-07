import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/types/userRole.type';
import { ReservationDto } from './dto/reservation.dto';

@Controller('reservations')
@UseGuards(RolesGuard)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Roles(Role.User)
  @Post()
  async createReservation(@Body() reservationDto: ReservationDto) {
    const { userId, showId, showInformationId } = reservationDto;
    return this.reservationService.createReservation(userId, showId, showInformationId);
  }

  @Roles(Role.User)
  @Get(':userId')
  async getReservations(@Param('userId') userId: number) {
    return this.reservationService.getReservations(userId);
  }
}
