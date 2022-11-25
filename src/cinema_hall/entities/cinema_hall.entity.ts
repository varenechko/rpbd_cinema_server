import { Cinema } from 'src/cinema/entities/cinema.entity';
import { PrimaryColumn, Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class CinemaHall {
  @PrimaryColumn({ type: 'numeric' })
  hall_id: number;

  @Column({ type: 'numeric' })
  cinema_id: number;

  @ManyToOne(() => Cinema, (cinema) => cinema.cinema_id)
  @JoinColumn({ name: 'cinema_id' })
  cinema: Cinema;

  @Column({ type: 'numeric' })
  hall_number: number;

  @Column({ type: 'numeric' })
  rows_number: number;
}
