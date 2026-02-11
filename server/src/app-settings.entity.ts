import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AppSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'settings' })
  key: string;

  @Column({ nullable: true })
  siteTitle: string;

  @Column({ nullable: true })
  heroTitle: string;

  @Column({ nullable: true })
  heroSubtitle: string;

  @Column('text', { nullable: true })
  bioLead: string;

  @Column('text', { nullable: true })
  bioFull: string;

  @Column('simple-array', { nullable: true })
  frontendSkills: string[];

  @Column('simple-array', { nullable: true })
  backendSkills: string[];

  @Column('simple-array', { nullable: true })
  toolSkills: string[];

  @Column({ nullable: true })
  githubUrl: string;

  @Column({ nullable: true })
  linkedinUrl: string;

  @Column({ nullable: true })
  twitterUrl: string;

  @Column({ nullable: true })
  email: string;
}
