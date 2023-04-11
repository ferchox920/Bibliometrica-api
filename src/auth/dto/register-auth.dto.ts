import { IsNotEmpty, IsString, IsEmail, IsStrongPassword, MinLength } from "class-validator"

export class RegisterAuthDto {

  @IsString({
    message: 'El nombre debe tener solo letras'
  })
  firstName: string;

  @IsString({
    message: 'El apellido debe tener solo letras'
  })
  lastName: string;

  @IsEmail({}, { message: 'Debe ingresar un email correcto' })
  email: string;

  @IsString({
    message: 'El nombre debe tener solo letras'
  })
  @MinLength(8, {message: "La contraceña debe teren mas de 8 caracteres"})
  password: string;
}