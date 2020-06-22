import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./createUser.dto";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User)
    private usersRepository: Repository<User>) {
        
    }

    create(user: CreateUserDto): Promise<User> {
      return this.usersRepository.save(user);
    } 

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
      }
    
    findOne(ip: string): Promise<User> {
      return this.usersRepository.findOne({ ipAddress: ip });
    }
    
}