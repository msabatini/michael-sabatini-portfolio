import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Analytics } from './analytics.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Analytics)
    private analyticsRepository: Repository<Analytics>,
  ) {}

  async trackEvent(
    path: string,
    userAgent: string,
    sessionId: string,
    referrer?: string,
    eventType: string = 'page_view',
    eventData?: string,
  ): Promise<Analytics> {
    const event = this.analyticsRepository.create({
      path,
      userAgent,
      sessionId,
      referrer,
      eventType,
      eventData,
    });
    return this.analyticsRepository.save(event);
  }

  async getStats() {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const totalViews = await this.analyticsRepository.count({
      where: { eventType: 'page_view' }
    });
    
    const recentViews = await this.analyticsRepository.count({
      where: { 
        timestamp: MoreThan(twentyFourHoursAgo),
        eventType: 'page_view'
      }
    });

    const uniqueVisitors = await this.analyticsRepository
      .createQueryBuilder('analytics')
      .select('COUNT(DISTINCT(analytics.sessionId))', 'count')
      .getRawOne();

    const topPages = await this.analyticsRepository
      .createQueryBuilder('analytics')
      .select('analytics.path', 'path')
      .addSelect('COUNT(*)', 'count')
      .where('analytics.eventType = :type', { type: 'page_view' })
      .groupBy('analytics.path')
      .orderBy('count', 'DESC')
      .limit(5)
      .getRawMany();

    const interactions = await this.analyticsRepository
      .createQueryBuilder('analytics')
      .select('analytics.eventData', 'name')
      .addSelect('COUNT(*)', 'count')
      .where('analytics.eventType = :type', { type: 'click' })
      .groupBy('analytics.eventData')
      .orderBy('count', 'DESC')
      .getRawMany();

    const topReferrers = await this.analyticsRepository
      .createQueryBuilder('analytics')
      .select('analytics.referrer', 'referrer')
      .addSelect('COUNT(*)', 'count')
      .where('analytics.referrer IS NOT NULL AND analytics.referrer != ""')
      .groupBy('analytics.referrer')
      .orderBy('count', 'DESC')
      .limit(5)
      .getRawMany();

    const browserStats = await this.analyticsRepository
      .createQueryBuilder('analytics')
      .select('analytics.userAgent', 'userAgent')
      .addSelect('COUNT(*)', 'count')
      .groupBy('analytics.userAgent')
      .getRawMany();

    // Simple manual parsing of browsers for dashboard
    const browsers = this.parseBrowsers(browserStats);

    const dailyActivity = await this.getDailyActivity(7);

    return {
      totalViews,
      recentViews,
      uniqueVisitors: parseInt(uniqueVisitors.count, 10),
      topPages,
      topReferrers,
      browsers,
      interactions,
      dailyActivity
    };
  }

  private async getDailyActivity(days: number) {
    const activity: { date: string; count: number }[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - i);

      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const count = await this.analyticsRepository.count({
        where: {
          timestamp: MoreThan(date),
          eventType: 'page_view'
        }
      });
      
      // The count above is actually "since date", we need "between date and nextDate"
      // But for SQLite simple count with MoreThan is often enough if we filter properly
      // Let's refine for actual daily buckets
      const dailyCount = await this.analyticsRepository
        .createQueryBuilder('analytics')
        .where('analytics.timestamp >= :date AND analytics.timestamp < :nextDate', { date, nextDate })
        .andWhere('analytics.eventType = :type', { type: 'page_view' })
        .getCount();

      activity.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        count: dailyCount
      });
    }
    return activity;
  }

  private parseBrowsers(rawStats: any[]) {
    const summary = {
      Chrome: 0,
      Safari: 0,
      Firefox: 0,
      Edge: 0,
      Other: 0
    };

    rawStats.forEach(stat => {
      const ua = stat.userAgent.toLowerCase();
      const count = parseInt(stat.count, 10);
      if (ua.includes('chrome') && !ua.includes('edg')) summary.Chrome += count;
      else if (ua.includes('safari') && !ua.includes('chrome')) summary.Safari += count;
      else if (ua.includes('firefox')) summary.Firefox += count;
      else if (ua.includes('edg')) summary.Edge += count;
      else summary.Other += count;
    });

    return Object.entries(summary)
      .map(([name, count]) => ({ name, count }))
      .filter(b => b.count > 0)
      .sort((a, b) => b.count - a.count);
  }
}
