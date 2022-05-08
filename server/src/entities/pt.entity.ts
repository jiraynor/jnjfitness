import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { PT_Body_Record } from './pt-body-record.entity';
import { PT_Record } from './pt-record.entity';
import { Trainer } from './trainer.entity';
import { User } from './user.entity';

@Entity('PT')
@Unique(['id'])
export class PT extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cnt: number;

  @Column('text')
  note: string;

  @Column('time')
  startTime: string;

  @Column('time')
  endTime: string;

  @Column('varchar', { length: 30 })
  days: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @ManyToOne(() => Trainer, { eager: true })
  trainer: Trainer;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @OneToMany(() => PT_Record, (pt_record) => pt_record.pt, { eager: true })
  records: PT_Record[];

  @OneToMany(() => PT_Body_Record, (pt_body_record) => pt_body_record.pt, {
    eager: true,
  })
  body_records: PT_Body_Record[];
}
