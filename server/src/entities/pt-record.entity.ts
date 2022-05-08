import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { PT } from './pt.entity';

@Entity('PT_Record')
@Unique(['record_id'])
export class PT_Record extends BaseEntity {
  @PrimaryGeneratedColumn()
  record_id: number;

  @Column()
  record_date: string;

  @Column('text')
  record_content: string;

  @ManyToOne(() => PT)
  pt: PT;
}
