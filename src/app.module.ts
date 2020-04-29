import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { typeOrmOptions } from './config/databse.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOptions),
    TasksModule],
})
export class AppModule {}
