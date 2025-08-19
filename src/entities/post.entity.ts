import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Tag } from './tag.entity';
import { User } from './user.entity';
import { Appeal } from './appeal.entity';
import { Comment } from './comment.entity';
import { PostReaction } from './post-reaction.entity';
import { Report } from './report.entity';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  slug: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imageUrl: string | null;

  @Column({ type: 'enum', enum: ['posted', 'scheduled', 'hidden'] })
  status: 'posted' | 'scheduled' | 'hidden';

  @Column({ type: 'datetime', nullable: true })
  publishAt: Date | null;

  @Column({ type: 'bigint', unsigned: true })
  tagId: number;

  @Column({ type: 'bigint', unsigned: true })
  userId: number;

  @Column({ type: 'datetime', nullable: true })
  publishedAt: Date | null;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date | null;

  @Column({ type: 'int', nullable: true })
  updateBy: number | null;

  @ManyToOne(() => Tag, (tag) => tag.posts)
  @JoinColumn({ name: 'tagId', referencedColumnName: 'id' })
  tag: Tag;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => Appeal, (appeal) => appeal.post)
  appeals: Appeal[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => PostReaction, (reaction) => reaction.post)
  reactions: PostReaction[];

  @OneToMany(() => Report, (report) => report.post)
  reports: Report[];
}
