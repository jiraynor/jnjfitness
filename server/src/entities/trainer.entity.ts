import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { Gender } from 'src/enum/gender.enum';
import { PT } from './pt.entity';

@Entity('Trainer')
@Unique(['id'])
export class Trainer extends BaseEntity {
  @PrimaryColumn('varchar', { length: 20 })
  id: string;

  @Column()
  password: string;

  @Column('varchar', { length: 20 })
  name: string;

  @Column('varchar', { length: 15 })
  tel: string;

  @Column()
  birth: string;

  @Column('varchar', { length: 5 })
  gender: Gender;

  @OneToMany(() => PT, (pt) => pt.trainer, { eager: false })
  pts: PT[];
}
