import { Controller, Post, Get, Body, Req } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import type { Request } from 'express';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('track')
  async track(@Body() data: { path: string; sessionId: string; referrer?: string }, @Req() req: Request) {
    const userAgent = req.headers['user-agent'] || 'unknown';
    return this.analyticsService.trackEvent(data.path, userAgent, data.sessionId, data.referrer);
  }

  @Get('stats')
  async getStats() {
    return this.analyticsService.getStats();
  }
}
