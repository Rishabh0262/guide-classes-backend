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

  // @UseGuards(AuthGuard)
  // @Get()
  // findAll(
  //   @Request() req: AuthenticatedRequest,
  //   @Query('take') take?: string,
  //   @Query('skip') skip?: string,
  // ) {
  //   const takeNum = take ? parseInt(take) : undefined;
  //   const skipNum = skip ? parseInt(skip) : undefined;
  //   return this.noteService.findAll(req.user.sub, takeNum, skipNum);
  // }

  // @UseGuards(AuthGuard)
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.noteService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
  //   return this.noteService.update(+id, updateNoteDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.noteService.remove(+id);
  // }
}
