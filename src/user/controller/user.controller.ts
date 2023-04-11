import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { createUserDto } from '../dto/create-user.dto';
import { UserService } from '../service/user.service';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(private userService : UserService) {}

    @Get()
    getUsers(): Promise<User[]>{
        return this.userService.getUsers()
    }

    @Post()
    createUser(@Body() newUser : createUserDto): Promise<User>{
        return this.userService.createUser(newUser)
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.userService.getUser(id);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe)id : number){
        return this.userService.deleteUser(id)
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto){
       return  this.userService.updateUser(id, user)
    }


}
