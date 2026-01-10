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
}
