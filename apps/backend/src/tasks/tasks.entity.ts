import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { User } from '../users/user.entity';
  
  @Entity({ name: 'tasks' })
  export class Task {
    @PrimaryGeneratedColumn({ name: 'task_id' })
    taskId: number;
  
    @Column({ name: 'description', type: 'text', nullable: false })
    description: string;
  
    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'NOW()' })
    createdAt: Date;

    @Column({ name: 'organization', type: 'varchar', length: 100, nullable: false})
    organization: string;
  
    // foreign key reference to users table
    @ManyToOne(() => User, (user) => user.tasks, {
      onDelete: 'CASCADE',
      nullable: false,
    })
    @JoinColumn({ name: 'employee_id' })
    employee: User;
  }
  