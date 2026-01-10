import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { MailService } from '../mail/mail.service';

@Controller('contact')
export class ContactController {
  constructor(private mailService: MailService) {}

  @Post()
  async submitContactForm(@Body() body: { name: string; email: string; subject: string; message: string }) {
    try {
      await this.mailService.sendContactForm(body.name, body.email, body.subject, body.message);
      return { message: 'Email sent successfully' };
    } catch (error) {
      console.error('Failed to send email:', error);
      throw new HttpException('Failed to send message', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
