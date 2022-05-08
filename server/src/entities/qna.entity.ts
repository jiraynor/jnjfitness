import { BoardClass } from 'src/enum/board-class.enum';
import { ReplyStatus } from 'src/enum/reply-status.enum';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Trainer } from './trainer.entity';
import { User } from './user.entity';

@Entity('QnA')
@Unique(['board_num'])
export class QnA extends BaseEntity {
  @PrimaryGeneratedColumn()
  board_num: number;

  @Column('varchar', { length: 20 })
  board_class: BoardClass;

  @Column('text')
  title: string;

  @Column('text')
  content: string;

  @Column()
  reg_datetime: string;

  @Column('varchar', { length: 3 })
  reply_status: ReplyStatus;

  @Column({ type: 'text', nullable: true })
  reply_content: string;

  @Column({ nullable: true })
  reply_datetime: string;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => Trainer, { eager: true })
  reply_writer: Trainer;
}
