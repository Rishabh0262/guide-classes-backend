import { BaseEntity } from 'src/common/entities/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Auth extends BaseEntity {
  @Column() userName: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;
}
