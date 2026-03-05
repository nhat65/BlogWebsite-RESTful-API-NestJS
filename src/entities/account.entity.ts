import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'varchar', length: 255, name: 'username' })
  username: string;

  @Column({ type: 'varchar', length: 255, name: 'password' })
  password: string;

  @Column({ type: 'varchar', length: 255, name: 'email' })
  email: string;

  @Column({ type: 'enum', enum: ['user', 'admin'], name: 'role' })
  role: 'user' | 'admin';

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

  @Column({ type: 'bigint', nullable: true, name: 'create_by' })
  createBy: number | null;

  @Column({ type: 'bigint', nullable: true, name: 'update_by' })
  updateBy: number | null;

  @OneToOne(() => User, (user) => user.account)
  user: User;
}
