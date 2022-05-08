import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Trainer } from './trainer.entity';

@Entity('Notice')
@Unique(['notice_num'])
export class Notice extends BaseEntity {
  @PrimaryGeneratedColumn()
  notice_num: number;

  @Column('text')
  title: string;

  @Column('text')
  content: string;

  @Column()
  reg_date: string;

  @ManyToOne(() => Trainer, { eager: true })
  writer: Trainer;
}
