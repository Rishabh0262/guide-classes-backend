import { Entity, Column, OneToMany } from 'typeorm';
import { Course } from '../../course/entities/course.entity';
import { BaseEntity } from 'src/common/entities/baseEntity';

@Entity('subjects')
export class Subject extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string; // e.g., "English", "Maths", "Science"

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  icon: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  // Relations
  @OneToMany(() => Course, (course) => course.subject)
  courses: Course[];
}
