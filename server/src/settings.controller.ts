import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { AppSettings } from './app-settings.entity';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  getSettings(): Promise<AppSettings> {
    return this.settingsService.getSettings();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  updateSettings(@Body() data: Partial<AppSettings>): Promise<AppSettings> {
    return this.settingsService.updateSettings(data);
  }
}
