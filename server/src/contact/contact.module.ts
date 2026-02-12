import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactController } from './contact.controller';
import { MessagesService } from './messages.service';
import { Message } from './message.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), MailModule],
  controllers: [ContactController],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class ContactModule {}
