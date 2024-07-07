import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShowInformation } from './show_information.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Entity({
  name: 'shows',
})
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  category: string;

  @Column({ name: 'image_url', type: 'varchar', nullable: false })
  imageUrl: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ name: 'total_seats', type: 'int', nullable: false })
  totalSeat: number;

  @Column({ type: 'varchar', nullable: false })
  location: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => ShowInformation, (showInformation) => showInformation.show)
  showInformation: ShowInformation[];

  @OneToMany(() => Reservation, (reservation) => reservation.show)
  reservation: Reservation[];
}
