import { CinemaHall } from 'src/cinema_hall/entities/cinema_hall.entity';
import { Film } from 'src/film/entities/film.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Session {
  @PrimaryColumn({ type: 'numeric' })
  session_id: number;

  @Column({ type: 'numeric' })
  film_id: number;

  @ManyToOne(() => Film, (film) => film.film_id)
  @JoinColumn({ name: 'film_id' })
  film: Film;

  @Column({ type: 'numeric' })
  hall_id: number;

  @ManyToOne(() => CinemaHall, (hall) => hall.hall_id)
  @JoinColumn({ name: 'hall_id' })
  hall: CinemaHall;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'timestamp without time zone' })
  date: Date;
}
