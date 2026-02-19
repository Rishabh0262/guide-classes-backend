import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/baseEntity';
import { Note } from '../../note/entities/note.entity';

export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
}

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];
}
