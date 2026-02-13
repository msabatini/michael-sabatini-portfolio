import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { ProjectsService } from './projects/projects.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(
    private readonly appService: AppService,
    private readonly projectsService: ProjectsService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async getHealth() {
    try {
      const projects = await this.projectsService.findAll();
      return {
        status: 'ok',
        database: 'connected',
        projectCount: projects.length
      };
    } catch (error) {
      this.logger.error('Health check failed', error);
      return {
        status: 'error',
        database: 'disconnected',
        message: error.message
      };
    }
  }
}
