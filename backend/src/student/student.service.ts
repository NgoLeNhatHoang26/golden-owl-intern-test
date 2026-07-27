import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubjectRegistry } from 'src/subject/subject.registry';
import { TopStudentGroupA } from './dto/student.dto';

@Injectable()
export class StudentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subjectRegistry: SubjectRegistry,
  ) {}

  async getStudentByRegistrationNumber(registrationNumber: string) {
    const student = await this.prisma.student.findUnique({
      where: { registrationNumber },
    });

    if (!student) {
      throw new NotFoundException(
        `Không tìm thấy thí sinh với SBD ${registrationNumber}`,
      );
    }

    return student;
  }

  async getTopStudentsByGroupA(): Promise<TopStudentGroupA[]> {
    const groupA = this.subjectRegistry.getGroupA();

    const selectColumns = groupA
      .map((subject) => `${subject.dbColumn} AS "${subject.code}"`)
      .join(',\n        ');

    const notNullConditions = groupA
      .map((subject) => `${subject.dbColumn} IS NOT NULL`)
      .join(' AND ');

    const totalScoreExpression = groupA
      .map((subject) => subject.dbColumn)
      .join(' + ');

    const sql = `
      SELECT
        sbd AS "registrationNumber",
        ${selectColumns},
        (${totalScoreExpression}) AS "totalScore"
      FROM students
      WHERE ${notNullConditions}
      ORDER BY (${totalScoreExpression}) DESC
      LIMIT 10
    `;

    return this.prisma.$queryRawUnsafe<TopStudentGroupA[]>(sql);
  }
}