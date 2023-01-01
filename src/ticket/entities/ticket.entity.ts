import { Film } from 'src/film/entities/film.entity';
import { Seat } from 'src/seat/entities/seat.entity';
import { Session } from 'src/session/entities/session.entity';
import { Users } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryColumn({ type: 'numeric' })
  ticket_id: number;

  @Column({ type: 'numeric' })
  profile_id: number;

  @ManyToOne(() => Users, (user) => user.profile_id)
  @JoinColumn({ name: 'profile_id' })
  user: Users;

  @Column({ type: 'numeric' })
  seat_id: number;

  @ManyToOne(() => Seat, (seat) => seat.seat_id)
  @JoinColumn({ name: 'seat_id' })
  seat: Seat;

  @Column({ type: 'numeric' })
  session_id: number;

  @ManyToOne(() => Session, (session) => session.session_id)
  @JoinColumn({ name: 'session_id' })
  session: Session;
}
