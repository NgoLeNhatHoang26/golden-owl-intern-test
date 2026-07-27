import { Controller, Get } from '@nestjs/common';
import { StatisticService } from './statistic.service';

@Controller('statistics')
export class StatisticController {
    constructor(private readonly statisticService: StatisticService){
        this.statisticService = statisticService;
    }
    @Get('subject-report-by-level')
    async getSubjectReportByLevel(){
        return this.statisticService.getSubjectReportByLevel()
    }
}