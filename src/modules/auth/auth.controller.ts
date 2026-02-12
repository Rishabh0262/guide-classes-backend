import { Controller, Get, Post, Body } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('register')
  registerTest() {
    return {
      message: 'register',
      status: 200,
      data: {
        name: 'John Doe',
        email: '[EMAIL_ADDRESS]',
        role: 'student',
      },
    };
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
