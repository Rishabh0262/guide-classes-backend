import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthGuard } from '../auth/auth.guard';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('api/notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createNoteDto: CreateNoteDto,
    @Request() req: AuthenticatedRequest, // req: {user: {sub: string}}
  ) {
    return this.noteService.create(createNoteDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Request() req: AuthenticatedRequest,
    @Query('take', new ParseIntPipe({ optional: true })) take?: number,
    @Query('skip', new ParseIntPipe({ optional: true })) skip?: number,
  ) {
    return this.noteService.findAll(
      { take: take || 10, skip: skip || 0 },
      req.user.sub, // userId convension is gonna be same, means as last while querying.
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.noteService.findOne(id, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.noteService.update(id, updateNoteDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.noteService.remove(id, req.user);
  }
}
