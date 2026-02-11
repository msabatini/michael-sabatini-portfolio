import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analytics } from './analytics.entity';
import { DashboardNote } from './dashboard-note.entity';
import { DashboardShare } from './dashboard-share.entity';
import { ApiKey } from './api-key.entity';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Analytics, DashboardNote, DashboardShare, ApiKey])],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
