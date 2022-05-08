import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { PT } from './pt.entity';

@Entity('PT_Body_Record')
@Unique(['body_record_id'])
export class PT_Body_Record extends BaseEntity {
  @PrimaryGeneratedColumn()
  body_record_id: number;

  @Column()
  body_record_date: string;

  @Column('float')
  weight: number;

  @Column('float')
  height: number;

  @Column('float')
  shoulder: number;

  @Column('float')
  chest: number;

  @Column('float')
  waist: number;

  @Column('float')
  butt: number;

  @Column('float')
  thigh: number;

  @Column('float')
  calf: number;

  @ManyToOne(() => PT)
  pt: PT;
}
