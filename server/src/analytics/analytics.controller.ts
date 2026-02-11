import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { Request } from 'express';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('track')
  async track(
    @Body() data: { 
      path: string; 
      sessionId: string; 
      referrer?: string; 
      eventType?: string; 
      eventData?: string;
      utmSource?: string;
      utmMedium?: string;
      utmCampaign?: string;
      os?: string;
      screenResolution?: string;
      clickX?: number;
      clickY?: number;
      isRageClick?: boolean;
    },
    @Req() req: Request
  ) {
    const userAgent = req.headers['user-agent'] || 'unknown';
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    return this.analyticsService.trackEvent(
      data.path,
      userAgent,
      data.sessionId,
      String(ip),
      data.referrer,
      data.eventType,
      data.eventData,
      data.utmSource,
      data.utmMedium,
      data.utmCampaign,
      data.os,
      data.screenResolution,
      data.clickX,
      data.clickY,
      data.isRageClick
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  async getStats(
    @Req() req: Request
  ) {
    const { start, end, device, location, campaign, path } = req.query;
    return this.analyticsService.getStats(
      start as string,
      end as string,
      {
        deviceType: device as string,
        location: location as string,
        utmCampaign: campaign as string,
        path: path as string
      }
    );
  }
}
