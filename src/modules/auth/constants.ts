import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJwtConfig = (
  configService: ConfigService,
): JwtModuleOptions => ({
  global: true,
  secret: configService.get<string>('JWT_SECRET'),
  signOptions: {
    expiresIn: configService.get('JWT_EXPIRATION') as NonNullable<
      JwtModuleOptions['signOptions']
    >['expiresIn'],
  }, // Default expiration, strictly config based would be better but this is a start
});

export const jwtConstants = {
  secret: process.env.JWT_SECRET, // Keep for now if needed elsewhere, or remove if fully migrating
};
