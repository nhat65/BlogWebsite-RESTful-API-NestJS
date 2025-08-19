import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity('report')
export class Report {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  reportedAt: Date;

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status: 'pending' | 'resolved' | 'dismissed';

  @Column({ type: 'bigint', unsigned: true })
  userId: number;

  @Column({ type: 'bigint', unsigned: true })
  postId: number;

  @Column({ type: 'datetime', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date | null;

  @Column({ type: 'int', nullable: true })
  resolvedBy: number | null;

  @ManyToOne(() => User, (user) => user.reports)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Post, (post) => post.reports)
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: Post;
}
