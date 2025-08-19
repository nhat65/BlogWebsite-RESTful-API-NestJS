import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Account } from './account.entity';
import { Appeal } from './appeal.entity';
import { Comment } from './comment.entity';
import { Post } from './post.entity';
import { PostReaction } from './post-reaction.entity';
import { Report } from './report.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  bio: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatarUrl: string | null;

  @Column({ type: 'varchar', length: 255 })
  country: string;

  @Column({ type: 'varchar', length: 50, default: 'actived' })
  status: 'actived' | 'locked' | 'deleted';

  @Column({ type: 'bigint', unsigned: true })
  accountId: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  joinedAt: Date;

  @Column({ type: 'datetime', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date | null;

  @Column({ type: 'bigint', nullable: true })
  createBy: number | null;

  @Column({ type: 'bigint', nullable: true })
  updateBy: number | null;

  @OneToOne(() => Account)
  @JoinColumn({ name: 'accountId', referencedColumnName: 'id' })
  account: Account;

  @OneToMany(() => Appeal, (appeal) => appeal.user)
  appeals: Appeal[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => PostReaction, (reaction) => reaction.user)
  reactions: PostReaction[];

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
}
