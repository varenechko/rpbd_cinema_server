import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Cinema {
  @PrimaryColumn({ type: 'numeric' })
  cinema_id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  address: string;
}
