import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Course } from 'src/modules/course/entities/course.entity';
import { BaseEntity } from 'src/common/entities/baseEntity';

@Entity('reviews')
export class Review extends BaseEntity {
  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'integer' })
  rating: number; // 1-5

  @Column({ type: 'boolean', default: true })
  isApproved: boolean;

  // Foreign Keys
  @Column({ type: 'uuid' })
  studentId: string;

  @Column({ type: 'uuid' })
  courseId: string;

  // Relations
  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studentId' })
  student: User;

  @ManyToOne(() => Course, (course) => course.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId' })
  course: Course;
}
