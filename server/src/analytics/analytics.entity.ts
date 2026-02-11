import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Analytics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column({ default: 'page_view' })
  eventType: string;

  @Column({ nullable: true })
  eventData: string;

  @Column({ nullable: true })
  userAgent: string;

  @Column({ nullable: true })
  sessionId: string;

  @Column({ nullable: true })
  referrer: string;

  @Column({ nullable: true })
  deviceType: string;

  @CreateDateColumn()
  timestamp: Date;
}
