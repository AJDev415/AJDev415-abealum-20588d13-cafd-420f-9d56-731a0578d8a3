import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { AuthGuard } from '../auth/auth.guard';

// Controller level guard for the final authentication on a request
@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    // Get tasks by organization
    @Get()
    findAll(@Query('organization') organization: string): Promise<Task[]> {
        return this.tasksService.getTasksByOrg(organization);
    }
    
    // Create a new task
    @Post()
    create(@Body() task: { employeeId: string, description: string, organization: string }): Promise<void> {
        return this.tasksService.createTask(task.employeeId, task.description, task.organization);
    }

    // Delete a task by ID
    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTask(parseInt(id, 10));
    }
}
