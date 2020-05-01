import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { User } from "src/auth/user.entity";

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn() // BigSerial 
    id:number;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column()
    status:TaskStatus;


    @ManyToOne(type => User, user => user.task, {eager:false})  //Could be many task for one user
    user:User;

    @Column()
    userId:number;
};