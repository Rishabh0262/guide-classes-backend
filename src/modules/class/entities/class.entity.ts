import { Entity, Column, OneToMany } from 'typeorm';
import { Course } from '../../course/entities/course.entity';
import { BaseEntity } from 'src/common/entities/baseEntity';

@Entity('classes')
export class Class extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string; // e.g., "Class 6", "Class 7"

  @Column({ type: 'integer' })
  level: number; // 6, 7, 8, 9, 10

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  // Relations
  @OneToMany(() => Course, (course) => course.class)
  courses: Course[];
}
