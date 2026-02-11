import { Controller, Post, Get, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { MessagesService } from './messages.service';

@Controller('contact')
export class ContactController {
  constructor(
    private mailService: MailService,
    private messagesService: MessagesService
  ) {}

  @Post()
  async submitContactForm(@Body() body: { name: string; email: string; subject: string; message: string }) {
    try {
      // Save to database
      await this.messagesService.create(body);
      
      // Send email
      await this.mailService.sendContactForm(body.name, body.email, body.subject, body.message);
      
      return { message: 'Email sent and message saved successfully' };
    } catch (error) {
      console.error('Failed to process contact form:', error);
      throw new HttpException(`Failed to send message: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('messages')
  async getAllMessages() {
    return this.messagesService.findAll();
  }

  @Post('messages/:id/read')
  async markAsRead(@Param('id') id: string) {
    return this.messagesService.markAsRead(+id);
  }

  @Delete('messages/:id')
  async deleteMessage(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }
}
