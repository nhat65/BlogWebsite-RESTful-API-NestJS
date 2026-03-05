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
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'varchar', length: 255, name: 'tag_name' })
  tagName: string;

  @Column({ type: 'varchar', length: 255, name: 'slug' })
  slug: string;

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

  @Column({ type: 'uuid', name: 'create_by' })
  createBy: string;

  @Column({ type: 'uuid', nullable: true, name: 'update_by' })
  updateBy: string | null;

  @OneToMany(() => Post, (post) => post.tag)
  posts: Post[];
}
