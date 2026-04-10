import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async getUserByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(registerDto: RegisterDto) {
    const user = this.usersRepository.create(registerDto);

    return this.usersRepository.save(user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      where: { isActive: true },
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'phone',
        'role',
        'createdAt',
      ],
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id, isActive: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existing = await this.usersRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (existing) {
        throw new ConflictException('Email already in use');
      }
    }

    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    await this.usersRepository.update(id, updateUserDto);
    return this.findById(id);
  }

  async deactivateUser(id: string): Promise<void> {
    await this.usersRepository.update(id, { isActive: false });
  }

  async activateUser(id: string): Promise<void> {
    await this.usersRepository.update(id, { isActive: true });
  }

  async delete(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  // async getStudentStats(studentId: string) {
  //   const user = await this.findById(studentId);

  //   const enrollmentCount = await this.usersRepository
  //     .createQueryBuilder('u')
  //     .leftJoinAndSelect('u.enrollments', 'e')
  //     .where('u.id = :studentId', { studentId })
  //     .select('COUNT(e.id)', 'totalCourses')
  //     .getRawOne();

  //   return {
  //     user,
  //     stats: {
  //       totalEnrolledCourses: enrollmentCount?.totalCourses || 0,
  //     },
  //   };
  // }
}
