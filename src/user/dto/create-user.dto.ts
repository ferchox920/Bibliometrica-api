import { IsNotEmpty, IsString, IsEmail, IsStrongPassword } from "class-validator"

export class createUserDto {

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password:string
}