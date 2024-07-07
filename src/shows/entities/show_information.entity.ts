import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Show } from './show.entity';
import { join } from 'path';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Entity({
  name: 'show_informations',
})
export class ShowInformation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'show_id', type: 'int', nullable: false })
  showId: number;

  @Column({ name: 'show_date', type: 'varchar', nullable: false })
  showDate: string;

  @Column({ name: 'show_time', type: 'varchar', nullable: false })
  showTime: string;

  @Column({ name: 'avaliable_seats', type: 'int', nullable: false })
  avaliableSeats: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Show, (show) => show.showInformation)
  @JoinColumn({ name: 'show_id', referencedColumnName: 'id' })
  show: Show;

  @OneToMany(() => Reservation, (reservation) => reservation.showInformation)
  reservation: Reservation[];
}
