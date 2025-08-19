import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity('post_reaction')
export class PostReaction {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'enum', enum: ['like', 'dislike'] })
  reaction: 'like' | 'dislike';

  @Column({ type: 'bigint', unsigned: true })
  postId: number;

  @Column({ type: 'bigint', unsigned: true })
  userId: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date | null;

  @ManyToOne(() => Post, (post) => post.reactions)
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: Post;

  @ManyToOne(() => User, (user) => user.reactions)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}
