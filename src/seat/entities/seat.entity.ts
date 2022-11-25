import { CinemaHall } from 'src/cinema_hall/entities/cinema_hall.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Seat {
  @PrimaryColumn({ type: 'numeric' })
  seat_id: number;

  @Column({ type: 'numeric' })
  hall_id: number;

  @ManyToOne(() => CinemaHall, (hall) => hall.hall_id)
  @JoinColumn({ name: 'hall_id' })
  hall: CinemaHall;

  @Column({ type: 'numeric' })
  row: number;

  @Column({ type: 'numeric' })
  seat_number: number;
}
