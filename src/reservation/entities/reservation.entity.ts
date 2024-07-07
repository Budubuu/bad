import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from 'src/user/types/reservation.status';
import { ShowInformation } from 'src/shows/entities/show_information.entity';
import { Show } from 'src/shows/entities/show.entity';
import { User } from 'src/user/entities/user.entity';

@Entity({
  name: 'reservations',
})
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'int', nullable: false })
  userId: number;

  @Column({ name: 'show_id', type: 'int', nullable: false })
  showId: number;

  @Column({ name: 'show_information_id', type: 'int', nullable: false })
  showInformationId: number;

  @Column({ type: 'enum', enum: Status }) //({name:'created_at',})
  status: Status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.reservation)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Show, (show) => show.reservation)
  @JoinColumn({ name: 'show_id', referencedColumnName: 'id' })
  show: Show;

  @ManyToOne(() => ShowInformation, (showInformation) => showInformation.reservation)
  @JoinColumn({ name: 'show_information_id', referencedColumnName: 'id' })
  showInformation: ShowInformation;
}
