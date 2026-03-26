import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/common/entities/baseEntity';

@Entity('offers')
export class Offer extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'integer' })
  discountPercentage: number; // 10-90

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
