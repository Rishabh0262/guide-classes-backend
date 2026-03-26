import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { BaseEntity } from 'src/common/entities/baseEntity';

@Entity('testimonials')
export class Testimonial extends BaseEntity {
  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'integer', default: 5 })
  rating: number; // 1-5

  @Column({ type: 'varchar', length: 255, nullable: true })
  company: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  designation: string;

  @Column({ type: 'boolean', default: true })
  isApproved: boolean;

  // Foreign Keys
  @Column({ type: 'uuid' })
  studentId: string;

  // Relations
  @ManyToOne(() => User, (user) => user.testimonials, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studentId' })
  student: User;
}
