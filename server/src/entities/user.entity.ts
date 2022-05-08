import { BaseEntity, Column, Entity, PrimaryColumn, Unique } from 'typeorm';
import { Gender } from 'src/enum/gender.enum';

@Entity('User')
@Unique(['id'])
export class User extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  password: string;

  @Column('varchar', { length: 20 })
  name: string;

  @Column()
  address: string;

  @Column('varchar', { length: 15 })
  tel: string;

  @Column('varchar', { length: 5 })
  gender: Gender;

  @Column()
  birth: string;

  @Column('text')
  note: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;
}
