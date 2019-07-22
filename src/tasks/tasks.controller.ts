import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskSService: TasksService) {};

  @Get()
  getTasks(@Query() filtersDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filtersDto).length) {
      return this.taskSService.getTasksWithFilters(filtersDto);
    }

    return this.taskSService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.taskSService.getTaskById(id);
  }

  @Delete('/:id')
  deleteByTaskId(@Param('id') id: string): void {
    this.taskSService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  changeTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ) {
    return this.taskSService.changeTaskStatus(id, status);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskSService.createTask(createTaskDto);
  }
}
