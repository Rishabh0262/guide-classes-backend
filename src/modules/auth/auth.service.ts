import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, passwordHash, userName } = registerDto;

    // 1. check email already exist
    const existingUser = await this.userService.getUserByEmail(email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordHash, salt);

    // 3. Create user
    const newUser = {
      userName,
      email,
      passwordHash: hashedPassword,
    };

    this.logger.log('User created successfully', newUser.userName);

    const savedUser = await this.userService.create(newUser);

    const payload = { sub: savedUser.id, email: savedUser.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };

    return savedUser;

    // // 4. Generate JWT (Placeholder for now)
    // // 5. Return token as response (Returning user for now as per request)
    // return {
    //   message: 'User registered successfully',
    //   data: {
    //     id: savedUser.id,
    //     userName: savedUser.userName,
    //     email: savedUser.email,
    //     createdAt: savedUser.createdAt,
    //   },
    // };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userService.getUserByEmail(email);

    /* 
        To safeguard the response or error msg from DDOS attaker we 
        throw the same error for both user not found and invalid password "401, unauthorizedexception"
    */
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
