import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SubjectModule } from 'src/subject/subject.module';

@Module({
  imports: [PrismaModule, SubjectModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}