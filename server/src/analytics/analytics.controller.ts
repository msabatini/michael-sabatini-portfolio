import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { Request } from 'express';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('track')
  async track(
    @Body() data: { path: string; sessionId: string; referrer?: string; eventType?: string; eventData?: string },
    @Req() req: Request
  ) {
    const userAgent = req.headers['user-agent'] || 'unknown';
    return this.analyticsService.trackEvent(
      data.path,
      userAgent,
      data.sessionId,
      data.referrer,
      data.eventType,
      data.eventData
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  async getStats() {
    return this.analyticsService.getStats();
  }
}
