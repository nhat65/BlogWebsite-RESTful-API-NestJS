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
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'varchar', length: 255, name: 'full_name' })
  fullName: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'bio' })
  bio: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'avatar_url' })
  avatarUrl: string | null;

  @Column({ type: 'varchar', length: 255, name: 'country' })
  country: string;

  @Column({ type: 'varchar', length: 50, default: 'actived', name: 'status' })
  status: 'actived' | 'locked' | 'deleted';

  @Column({ type: 'uuid', name: 'account_id' })
  accountId: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'joined_at',
  })
  joinedAt: Date;

  @Column({
    type: 'datetime',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date | null;

  @Column({ type: 'uuid', nullable: true, name: 'create_by' })
  createBy: string | null;

  @Column({ type: 'uuid', nullable: true, name: 'update_by' })
  updateBy: string | null;

  @OneToOne(() => Account)
  @JoinColumn({ name: 'account_id', referencedColumnName: 'id' })
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
