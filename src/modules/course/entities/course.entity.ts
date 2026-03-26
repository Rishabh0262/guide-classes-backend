import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Class } from '../../class/entities/class.entity';
import { Subject } from '../../subject/entities/subject.entity';
import { BaseEntity } from 'src/common/entities/baseEntity';
import { Enrollment } from 'src/modules/enrollment/entities/enrollment.entity';
import { Review } from 'src/modules/reviews/entities/review.entity';

@Entity('courses')
export class Course extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 500 })
  youtubeUrl: string; // YouTube video URL

  @Column({ type: 'varchar', length: 255, nullable: true })
  thumbnail: string;

  @Column({ type: 'float', default: 0 })
  duration: number; // in minutes

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ type: 'integer', default: 0 })
  totalEnrolled: number;

  @Column({ type: 'text', nullable: true })
  instructor: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  // Foreign Keys
  @Column({ type: 'uuid' })
  classId: string;

  @Column({ type: 'uuid' })
  subjectId: string;

  // Relations
  @ManyToOne(() => Class, (cls) => cls.courses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'classId' })
  class: Class;

  @ManyToOne(() => Subject, (subject) => subject.courses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subjectId' })
  subject: Subject;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];

  @OneToMany(() => Review, (review) => review.course)
  reviews: Review[];
}
