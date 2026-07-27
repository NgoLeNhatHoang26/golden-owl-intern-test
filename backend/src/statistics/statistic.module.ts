import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SubjectModule } from 'src/subject/subject.module';
@Module({
    imports: [PrismaModule, SubjectModule],
    controllers: [StatisticController],
    providers: [StatisticService],  
})
export class StatisticModule {}