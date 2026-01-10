import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendContactForm(name: string, email: string, subject: string, message: string) {
    await this.mailerService.sendMail({
      to: 'michaelsabatinidesign@gmail.com', // destination email
      subject: `New Contact Form Submission: ${subject}`,
      template: './contact', // maybe use text for now if no templates
      context: {
        name,
        email,
        subject,
        message,
      },
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    });
  }
}
