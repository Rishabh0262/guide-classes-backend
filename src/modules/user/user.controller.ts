import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { GetUser } from '../../common/decorators/user.decorator';
import { Role } from '../../common/enums/role.enum';
import type { AuthUser } from '../auth/types/auth-user.type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  async findAll() {
    return this.userService.findAll();
  }

  @Get('profile')
  async getProfile(@GetUser() user: AuthUser) {
    return this.userService.findById(user.id);
  }

  // @Get('stats/:studentId')
  // async getStudentStats(@Param('studentId') studentId: string) {
  //   return this.userService.getStudentStats(studentId);
  // }

  @Get(':id')
  @Roles(Role.ADMIN)
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: AuthUser,
  ) {
    // Only the user themselves or an admin can update a profile
    if (user.id !== id && user.role !== Role.ADMIN) {
      throw new ForbiddenException(
        'You are not authorized to update this user',
      );
    }

    // Prevent non-admins from changing the role field (privilege escalation)
    if (user.role !== Role.ADMIN) {
      delete updateUserDto.role;
    }

    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
    return { message: 'User deleted successfully' };
  }

  @Put(':id/deactivate')
  @Roles(Role.ADMIN)
  async deactivate(@Param('id') id: string) {
    await this.userService.deactivateUser(id);
    return { message: 'User deactivated successfully' };
  }

  @Put(':id/activate')
  @Roles(Role.ADMIN)
  async activate(@Param('id') id: string) {
    await this.userService.activateUser(id);
    return { message: 'User activated successfully' };
  }
}
