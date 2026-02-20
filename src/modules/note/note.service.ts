import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { JwtPayload } from '../auth/types/jwt-payload.type';

@Injectable()
export class NoteService {
  private readonly logger = new Logger(NoteService.name);

  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto, user: JwtPayload) {
    const note = await this.noteRepository.create({
      ...createNoteDto,
      userId: user.sub,
      createdBy: user.email,
    });
    this.logger.log(`Note created: ${note.title}`);
    return this.noteRepository.save(note);
  }

  async findAll(
    { skip, take }: { skip: number; take: number },
    userId: string,
  ) {
    const notes = await this.noteRepository.find({
      skip,
      take,
      where: { userId },
    });
    this.logger.log(`Notes found: ${notes}`);
    return notes;
  }

  async findOne(id: string, userId: string) {
    const note = await this.noteRepository.findOne({ where: { id, userId } });
    this.logger.log(`Note found: ${note}`);
    if (!note) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto, user: JwtPayload) {
    const note = await this.findOne(id, user.sub);

    if (!note) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }

    if (note?.userId !== user.sub) {
      throw new ForbiddenException(
        `You are not authorized to update this note`,
      );
    }

    const updatedNote = await this.noteRepository.update(id, {
      ...updateNoteDto,
      userId: user.sub,
      updatedBy: user.email,
    });
    this.logger.log(`Note found: ${updatedNote}`);
    if (!updatedNote) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
    return updatedNote;
  }

  remove(id: string, user: JwtPayload) {
    const note = this.noteRepository.update(id, {
      isDeleted: true,
      deletedBy: user.email,
    });
    this.logger.log(`Note deleted: ${note}`);
    return note;
  }
}
