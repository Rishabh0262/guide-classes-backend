import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/db.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TestModule } from './modules/test/test.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { NoteModule } from './modules/note/note.module';
import { ClassModule } from './modules/class/class.module';
import { CourseModule } from './modules/course/course.module';
import { SubjectModule } from './modules/subject/subject.module';
import { EnrollmentModule } from './modules/enrollment/enrollment.module';
import { CareerModule } from './modules/career/career.module';
import { TestimonialModule } from './modules/testimonial/testimonial.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { OffersModule } from './modules/offers/offers.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
    TestModule,
    AuthModule,
    UserModule,
    NoteModule,
    ClassModule,
    CourseModule,
    SubjectModule,
    EnrollmentModule,
    CareerModule,
    TestimonialModule,
    ReviewsModule,
    OffersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
