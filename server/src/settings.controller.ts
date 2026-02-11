import { Controller, Get, Patch, Body } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { AppSettings } from './app-settings.entity';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  getSettings(): Promise<AppSettings> {
    return this.settingsService.getSettings();
  }

  @Patch()
  updateSettings(@Body() data: Partial<AppSettings>): Promise<AppSettings> {
    return this.settingsService.updateSettings(data);
  }
}
