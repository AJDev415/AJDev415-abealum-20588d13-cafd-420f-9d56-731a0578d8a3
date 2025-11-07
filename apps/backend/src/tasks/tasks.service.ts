import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) { }

    private tasks: Task[] = [];

    async createTask(employeeId: string, description: string, organization: string): Promise<void> { 
        const newTask = this.taskRepository.create({ employee: { id: parseInt(employeeId) }, description, organization})
        await this.taskRepository.save(newTask);
        console.log(`Task created for employee ID: ${employeeId} with description: ${description} in org: ${organization}`);
    }

    async getTasksByOrg(organization: string): Promise<Task[]> {
        return await this.taskRepository.find({where: {organization}})
    }

    async deleteTask(id: number): Promise<void> {
        await this.taskRepository.delete(id);
        console.log(`Task with ID: ${id} has been deleted`);
    }
}
