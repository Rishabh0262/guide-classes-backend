import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Course } from '../../course/entities/course.entity';
import { BaseEntity } from 'src/common/entities/baseEntity';

@Entity('enrollments')
export class Enrollment extends BaseEntity {
  @Column({ type: 'float', default: 0 })
  progress: number; // 0-100

  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;

  @Column({ type: 'integer', default: 0 })
  lessonsWatched: number;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @CreateDateColumn()
  enrolledAt: Date;

  // Foreign Keys
  @Column({ type: 'uuid' })
  studentId: string;

  @Column({ type: 'uuid' })
  courseId: string;

  // Relations
  @ManyToOne(() => User, (user) => user.enrollments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studentId' })
  student: User;

  @ManyToOne(() => Course, (course) => course.enrollments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'courseId' })
  course: Course;
}
