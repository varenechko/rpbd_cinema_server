import { Film } from 'src/film/entities/film.entity';
import { Seat } from 'src/seat/entities/seat.entity';
import { Users } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryColumn({ type: 'numeric' })
  ticket_id: number;

  @Column({ type: 'numeric' })
  film_id: number;

  @ManyToOne(() => Film, (film) => film.film_id)
  @JoinColumn({ name: 'film_id' })
  film: Film;

  @Column({ type: 'numeric' })
  profile_id: number;

  @ManyToOne(() => Users, (user) => user.profile_id)
  @JoinColumn({ name: 'profile_id' })
  user: Users;

  @Column({ type: 'numeric' })
  seat_id: number;

  // @OneToMany(() => Seat, (seat) => seat.seat_id)
  // seat: Seat;

  @ManyToOne(() => Seat, (seat) => seat.seat_id)
  @JoinColumn({ name: 'seat_id' })
  seat: Seat;

  @Column({ type: 'timestamp without time zone' })
  date: Date;

  @Column({ type: 'numeric' })
  price: number;
}
