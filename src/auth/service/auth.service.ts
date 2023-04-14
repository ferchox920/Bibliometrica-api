import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from '../dto/register-auth.dto';
import { hash, compare } from 'bcrypt'
import { LoginAuthDto } from '../dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepo : Repository<User>,
        private jwtService : JwtService
    ){}

    async register (userObjet : RegisterAuthDto){
        const { password } = userObjet;

        const plainToHash = await hash(password, 10);

        userObjet = {...userObjet, password: plainToHash};

        const user =  this.userRepo.create(userObjet);
        this.userRepo.save(user);
        return user;

    }

   async login(userLogin: LoginAuthDto){
        const {email, password} = userLogin;
        const findUser = await this.userRepo.findOne({where:{email}})
        if(!findUser) throw new HttpException("USER_NOT_FOUND", 404);

        const checkPassword = await compare(password, findUser.password)

        if(!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403)

        const payload = {email: findUser.email, name: findUser.firstName};
        const token = await this.jwtService.sign(payload);

        const data = {
            user: findUser,
            token,
        }

        return data;

    }
}
