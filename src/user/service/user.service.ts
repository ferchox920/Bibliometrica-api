import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { createUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private userRepo : Repository<User>
    ){}

    getUsers(){
        return this.userRepo.find();
    }

    getUser(id: number){
        return this.userRepo.findOne({
            where:{
                id
            }
        })
    }

    createUser(user : createUserDto){
        const newUser = this.userRepo.create(user)
        return this.userRepo.save(newUser);
    }

    deleteUser(id: number){
        return this.userRepo.delete(id);
    }

    updateUser(id: number, user: UpdateUserDto){
        return this.userRepo.update({id}, user)
    }

}
