import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity('appeal')
export class Appeal {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'enum', enum: ['post', 'user'] })
  type: 'post' | 'user';

  @Column({ type: 'bigint', unsigned: true })
  userId: number;

  @Column({ type: 'bigint', unsigned: true })
  postId: number;

  @Column({ type: 'varchar', length: 255 })
  reason: string;

  @Column({ type: 'text' })
  message: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'resolved', 'rejected'],
    default: 'pending',
  })
  status: 'pending' | 'resolved' | 'rejected';

  @Column({ type: 'bigint', nullable: true })
  resolvedBy: number | null;

  @Column({ type: 'datetime', nullable: true })
  resolvedAt: Date | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date | null;

  @ManyToOne(() => User, (user) => user.appeals)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Post, (post) => post.appeals, { nullable: true })
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: Post | null;
}
