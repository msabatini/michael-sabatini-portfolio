import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  companyLogo: string;

  @Column('simple-array', { nullable: true })
  gallery: string[];

  @Column('text')
  content: string; // Detailed case study content

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column('text', { nullable: true })
  challenge: string;

  @Column('text', { nullable: true })
  solution: string;

  @Column('text', { nullable: true })
  result: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  mockupUrl: string;

  @Column({ nullable: true })
  completedDate: string;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ default: 0 })
  order: number;

  @Column({ default: 'web' })
  type: string; // 'web' or 'print'

  @Column('simple-json', { nullable: true })
  designSpecs: { label: string; value: string; type: string }[];
}
