import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseGuards,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { Request } from 'express';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('track')
  async track(
    @Body()
    data: {
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
    @Req() req: Request,
  ) {
    const userAgent = req.headers['user-agent'] || 'unknown';
    const ip =
      req.ip ||
      req.headers['x-forwarded-for'] ||
      req.socket.remoteAddress ||
      'unknown';
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
      data.isRageClick,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  async getStats(@Req() req: Request) {
    const { start, end, device, location, campaign, path, compare } = req.query;
    return this.analyticsService.getStats(start as string, end as string, {
      deviceType: device as string,
      location: location as string,
      utmCampaign: campaign as string,
      path: path as string,
      compare: compare === 'true',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('notes')
  async getNotes() {
    return this.analyticsService.getNotes();
  }

  @UseGuards(JwtAuthGuard)
  @Post('notes')
  async addNote(
    @Body() data: { content: string; date: string; type?: string },
  ) {
    return this.analyticsService.addNote(data.content, data.date, data.type);
  }

  @UseGuards(JwtAuthGuard)
  @Post('notes/delete')
  async deleteNote(@Body() data: { id: number }) {
    return this.analyticsService.deleteNote(data.id);
  }

  // Sharing Links
  @UseGuards(JwtAuthGuard)
  @Get('shares')
  async getShares() {
    return this.analyticsService.getShareLinks();
  }

  @UseGuards(JwtAuthGuard)
  @Post('shares')
  async createShare(@Body() data: { label?: string; expiresDays?: number }) {
    return this.analyticsService.createShareLink(data.label, data.expiresDays);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('shares/:id')
  async deleteShare(@Param('id') id: string) {
    return this.analyticsService.deleteShareLink(+id);
  }

  // Public stats access via token
  @Get('shared/:token')
  async getSharedStats(@Param('token') token: string) {
    const stats = await this.analyticsService.getStatsByToken(token);
    if (!stats) {
      throw new HttpException(
        'Invalid or expired share token',
        HttpStatus.NOT_FOUND,
      );
    }
    return stats;
  }

  // API Keys
  @UseGuards(JwtAuthGuard)
  @Get('keys')
  async getKeys() {
    return this.analyticsService.getApiKeys();
  }

  @UseGuards(JwtAuthGuard)
  @Post('keys')
  async createKey(@Body() data: { label: string }) {
    return this.analyticsService.createApiKey(data.label);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('keys/:id')
  async deleteKey(@Param('id') id: string) {
    return this.analyticsService.deleteApiKey(+id);
  }

  // Raw data access via API Key
  @Get('raw')
  async getRawData(@Req() req: Request) {
    const key = req.headers['x-api-key'] as string;
    if (!key || !(await this.analyticsService.validateApiKey(key))) {
      throw new HttpException(
        'Invalid or missing API key',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.analyticsService.getStats();
  }
}
