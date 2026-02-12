import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async create(data: Partial<Message>): Promise<Message> {
    const message = this.messagesRepository.create(data);
    return this.messagesRepository.save(message);
  }

  async findAll(): Promise<Message[]> {
    return this.messagesRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(id: number): Promise<void> {
    await this.messagesRepository.update(id, { isRead: true });
  }

  async updateStatus(id: number, status: string): Promise<void> {
    await this.messagesRepository.update(id, { status });
  }

  async remove(id: number): Promise<void> {
    await this.messagesRepository.delete(id);
  }
}
