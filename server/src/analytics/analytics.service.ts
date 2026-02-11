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

  async trackEvent(path: string, userAgent: string, sessionId: string, referrer?: string): Promise<Analytics> {
    const event = this.analyticsRepository.create({
      path,
      userAgent,
      sessionId,
      referrer,
    });
    return this.analyticsRepository.save(event);
  }

  async getStats() {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const totalViews = await this.analyticsRepository.count();
    
    const recentViews = await this.analyticsRepository.count({
      where: { timestamp: MoreThan(twentyFourHoursAgo) }
    });

    const uniqueVisitors = await this.analyticsRepository
      .createQueryBuilder('analytics')
      .select('COUNT(DISTINCT(analytics.sessionId))', 'count')
      .getRawOne();

    const topPages = await this.analyticsRepository
      .createQueryBuilder('analytics')
      .select('analytics.path', 'path')
      .addSelect('COUNT(*)', 'count')
      .groupBy('analytics.path')
      .orderBy('count', 'DESC')
      .limit(5)
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

    return {
      totalViews,
      recentViews,
      uniqueVisitors: parseInt(uniqueVisitors.count, 10),
      topPages,
      topReferrers,
      browsers
    };
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
