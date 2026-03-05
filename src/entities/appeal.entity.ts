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
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'enum', enum: ['post', 'user'], name: 'type' })
  type: 'post' | 'user';

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({ type: 'uuid', name: 'post_id' })
  postId: string;

  @Column({ type: 'varchar', length: 255, name: 'reason' })
  reason: string;

  @Column({ type: 'text', name: 'message' })
  message: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'resolved', 'rejected'],
    default: 'pending',
    name: 'status',
  })
  status: 'pending' | 'resolved' | 'rejected';

  @Column({ type: 'uuid', nullable: true, name: 'resolved_by' })
  resolvedBy: string | null;

  @Column({ type: 'datetime', nullable: true, name: 'resolved_at' })
  resolvedAt: Date | null;

  @Column({ type: 'text', nullable: true, name: 'notes' })
  notes: string | null;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: 'datetime',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date | null;

  @ManyToOne(() => User, (user) => user.appeals)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Post, (post) => post.appeals, { nullable: true })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post: Post | null;
}
