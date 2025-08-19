import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Post } from './post.entity';

@Entity('tag')
@Index('tag_slug_index', ['slug'])
export class Tag {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  tagName: string;

  @Column({ type: 'varchar', length: 255 })
  slug: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date | null;

  @Column({ type: 'varchar', length: 50 })
  createBy: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  updateBy: string | null;

  @OneToMany(() => Post, (post) => post.tag)
  posts: Post[];
}
