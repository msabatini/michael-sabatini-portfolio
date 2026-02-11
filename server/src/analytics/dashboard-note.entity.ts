import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class DashboardNote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ default: 'info' })
  type: string; // info, alert, milestone

  @CreateDateColumn()
  createdAt: Date;
}
