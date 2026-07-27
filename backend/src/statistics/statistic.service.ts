import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubjectStatisticResponseDto } from './dto/statistic.dto';
import { SubjectRegistry } from '../subject/subject.registry';
import { ISubject } from '../subject/interface/subject.interface';


type SubjectStatisticRaw = Record<string, number | bigint>;

@Injectable()
export class StatisticService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly subjectRegistry: SubjectRegistry
    ){}
    async getSubjectReportByLevel(): Promise<SubjectStatisticResponseDto[]> {
        const raw = await this.queryAllStatistics();
    
        return  this.subjectRegistry.getAll().map((subject) => this.mapToDTO(subject, raw))
    }
    private mapToDTO(subject: ISubject, raw: SubjectStatisticRaw): SubjectStatisticResponseDto {
        const prefix = subject.statisticPrefix;
        return {
          subject: subject.code,
          excellent: this.toNumber(raw[`${prefix}_excellent`]),
          good: this.toNumber(raw[`${prefix}_good`]),
          average: this.toNumber(raw[`${prefix}_average`]),
          poor: this.toNumber(raw[`${prefix}_poor`]),
        };       
    }


    private toNumber(value: unknown): number {
        if (typeof value === 'bigint') {
            return Number(value);
        }

        return Number(value ?? 0);
    }

    private async queryAllStatistics(): Promise<SubjectStatisticRaw> {
        const selectClause = this.subjectRegistry
          .getAll()
          .map((subject) => subject.buildStatisticCountFilter())
          .join(',\n');
        const sql = `
          SELECT
            ${selectClause}
          FROM students
        `;
        const [result] = await this.prisma.$queryRawUnsafe<SubjectStatisticRaw[]>(sql);
        return result;
    }
}