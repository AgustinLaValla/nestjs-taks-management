import { Controller, Get, Param, ParseIntPipe, ValidationPipe, Post, Body, UsePipes, Delete, Patch, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { GetTasFilterDto } from './dto/get-task-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';


@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(
        @GetUser() user:User,
        @Query(ValidationPipe) filterDto: GetTasFilterDto
    ) {
        return this.tasksService.getTasks(filterDto,user);
    };

    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user:User
    ): Promise<Task> {
        return this.tasksService.getTaskById(id,user);
    };


    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user:User
    ): Promise<Task> {
        return this.tasksService.createTask(createTaskDto, user);
    };

    @Patch('/:id/status')
    getTaskByIdAndUpdateStatus(
        @GetUser() user:User,
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status, user);
    };

    @Delete('/:id')
    deleteTask(
        @GetUser() user:User,
        @Param('id', ParseIntPipe
    ) id: number) {
        return this.tasksService.deleteTask(id,user);
    };

};

