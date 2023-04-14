import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common'
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';
import { AuthService } from 'src/auth/service/auth.service';
import { User } from 'src/user/entities/user.entity';
import { LoginAuthDto } from '../dto/login-auth.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    registerUser(@Body() userObjet: RegisterAuthDto ): Promise<User> {
        return this.authService.register(userObjet)
    }

    @Post('login')
    loginUser(@Body() userLogin : LoginAuthDto): Promise<any>{
        return this.authService.login(userLogin)
    }
}
