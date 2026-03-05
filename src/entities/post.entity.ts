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
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'varchar', length: 255, name: 'title' })
  title: string;

  @Column({ type: 'varchar', length: 255, name: 'slug' })
  slug: string;

  @Column({ type: 'text', name: 'content' })
  content: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'image_url' })
  imageUrl: string | null;

  @Column({
    type: 'enum',
    enum: ['posted', 'scheduled', 'hidden'],
    name: 'status',
  })
  status: 'posted' | 'scheduled' | 'hidden';

  @Column({ type: 'datetime', nullable: true, name: 'publish_at' })
  publishAt: Date | null;

  @Column({ type: 'uuid', name: 'tag_id' })
  tagId: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({ type: 'datetime', nullable: true, name: 'published_at' })
  publishedAt: Date | null;

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

  @Column({ type: 'uuid', nullable: true, name: 'update_by' })
  updateBy: string | null;

  @ManyToOne(() => Tag, (tag) => tag.posts)
  @JoinColumn({ name: 'tag_id', referencedColumnName: 'id' })
  tag: Tag;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
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
