import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/common/entities/baseEntity';

@Entity('careers')
export class Career extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string; // Job Title

  @Column({ type: 'varchar', length: 255 })
  company: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  location: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  salary: string; // e.g., "50000-60000"

  @Column({ type: 'varchar', length: 100, nullable: true })
  jobType: string; // Full-time, Part-time, Contract

  @Column({ type: 'text', nullable: true })
  requirements: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  applyLink: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
