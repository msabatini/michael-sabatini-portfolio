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

  @Column({ nullable: true })
  ip: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  utmSource: string;

  @Column({ nullable: true })
  utmMedium: string;

  @Column({ nullable: true })
  utmCampaign: string;

  @Column({ nullable: true })
  os: string;

  @Column({ nullable: true })
  screenResolution: string;

  @Column({ nullable: true })
  clickX: number;

  @Column({ nullable: true })
  clickY: number;

  @Column({ default: false })
  isRageClick: boolean;

  @CreateDateColumn()
  timestamp: Date;
}
