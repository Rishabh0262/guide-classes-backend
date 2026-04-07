import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/baseEntity';
import { Note } from '../../note/entities/note.entity';
import { Role } from 'src/common/enums/role.enum';
import { Enrollment } from 'src/modules/enrollment/entities/enrollment.entity';
import { Testimonial } from 'src/modules/testimonial/entities/testimonial.entity';
import { Review } from 'src/modules/reviews/entities/review.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'enum', enum: Role, default: Role.STUDENT })
  role: Role;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  // Relations
  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];

  @OneToMany(() => Review, (review) => review.student)
  reviews: Review[];

  @OneToMany(() => Testimonial, (testimonial) => testimonial.student)
  testimonials: Testimonial[];

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];
}
