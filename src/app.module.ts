import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { typeOrmOptions } from './config/databse.config';
import { AuthModule } from './auth/auth.module';
 
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOptions),
    TasksModule,
    AuthModule,
],
})
export class AppModule {}
