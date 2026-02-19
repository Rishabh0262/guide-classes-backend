import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/baseEntity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Note extends BaseEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.notes)
  user: User;
}
