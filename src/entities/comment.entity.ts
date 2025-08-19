import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'bigint', unsigned: true })
  userId: number;

  @Column({ type: 'bigint', unsigned: true })
  postId: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  parentId: number | null;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date | null;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: Post;

  @ManyToOne(() => Comment, (comment) => comment.children, { nullable: true })
  @JoinColumn({ name: 'parentId', referencedColumnName: 'id' })
  parent: Comment | null;

  @OneToMany(() => Comment, (comment) => comment.parent)
  children: Comment[];
}
