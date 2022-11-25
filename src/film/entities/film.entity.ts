import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Film {
  @PrimaryColumn({ type: 'numeric' })
  film_id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'numeric' })
  age: number;

  @Column({ type: 'text', nullable: true })
  poster: string;
}
