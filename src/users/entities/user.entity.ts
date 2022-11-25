import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryColumn({ type: 'numeric' })
  profile_id: number;

  @Column({ type: 'text', unique: true })
  user_name: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'numeric' })
  bonus_card_number: number;

  @Column({ default: false })
  is_admin: boolean;
}
