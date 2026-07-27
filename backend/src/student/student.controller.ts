import { Controller, Get, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { RegistrationNumberPipe } from './pipe/registraion-number.pipe';

@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Get('/top-students')
    async getTopStudents() {
        return this.studentService.getTopStudentsByGroupA();
    }

    @Get('/:registrationNumber')
    async getStudentByRegistrationNumber(@Param('registrationNumber', RegistrationNumberPipe) registrationNumber: string) {
        return this.studentService.getStudentByRegistrationNumber(registrationNumber);
    }
}