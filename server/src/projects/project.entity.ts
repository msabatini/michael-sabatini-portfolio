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

  @Column({ default: 'stack' })
  layout: string; // 'stack' or 'grid'

  @Column('simple-json', { nullable: true })
  designSpecs: { label: string; value: string; type: string }[];

  @Column('simple-json', { nullable: true })
  colorPalette: { hex: string; rgb: string; cmyk: string; pms: string }[];

  @Column({ nullable: true })
  year: string;

  @Column({ nullable: true })
  role: string;

  @Column('simple-json', { nullable: true })
  overview: { lead: string; bullets: string[] };

  @Column('simple-json', { nullable: true })
  product: { problem: string; uxChallenge: string; decisions: string[] };

  @Column('simple-json', { nullable: true })
  build: { responsibilities: string[]; stack: string[]; status: string };

  @Column('simple-json', { nullable: true })
  links: { label: string; href: string }[];

  @Column('simple-json', { nullable: true })
  extraSections: { title: string; paragraphs: string[] }[];
}
