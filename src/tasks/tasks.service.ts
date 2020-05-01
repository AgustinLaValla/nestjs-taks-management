import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasFilterDto } from './dto/get-task-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    
    constructor(
        @InjectRepository(TaskRepository) 
        private taskRepository: TaskRepository
    ) { };
    
    async getTasks(filterDto:GetTasFilterDto, user:User): Promise<Task[]> { 
        return await this.taskRepository.getTasks(filterDto, user);
     };
 

    async getTaskById(id: number,user:User) :Promise<Task> { 
        const found = await this.taskRepository.findOne({where: {id, userId: user.id }});
        if(!found) { 
            throw new NotFoundException(`Task with id: "${id}" not found`);
        };
        return found;
    };

   
    async createTask(task:CreateTaskDto, user:User): Promise<Task> { 
        const newTask = await this.taskRepository.createTask(task, user);
        return newTask;
    };

    async updateTaskStatus(id:number, status:TaskStatus, user:User):Promise<Task> {
        const task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();
        return task;
    };
 
    async deleteTask(id:number, user:User): Promise<void> { 
      const result = await this.taskRepository.delete({id, userId: user.id});
      if(result.affected === 0) { 
        throw new NotFoundException(`Task with id: ${id} not found!`); 
      };
    };
};
