import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StudentModule } from './student/student.module';
import { StatisticModule } from './statistics/statistic.module';

@Module({
  imports: [PrismaModule, StudentModule, StatisticModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
