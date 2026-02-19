import { Injectable, Logger } from '@nestjs/common';
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

  create(createNoteDto: CreateNoteDto, user: JwtPayload) {
    const note = this.noteRepository.create({
      ...createNoteDto,
      userId: user.sub,
      createdBy: user.email,
    });
    this.logger.log(`Note created: ${note.title}`);
    return this.noteRepository.save(note);
  }

  // findAll(userId: string) {
  //   const notes = this.noteRepository.find({ where: { userId } });
  //   this.logger.log(`Notes found: ${notes}`);
  //   return notes;
  // }

  // findOne(id: number) {
  //   return this.noteRepository.findOne(id);
  // }

  // update(id: number, updateNoteDto: UpdateNoteDto) {
  //   return `This action updates a #${id} note`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} note`;
  // }
}
