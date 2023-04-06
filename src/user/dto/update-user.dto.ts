import { IsOptional, IsString, MinLength, IsEmail, IsStrongPassword } from "class-validator";

export class UpdateUserDto{
  @IsString()
  @IsOptional()
  @MinLength(3)
  firstName?: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  lastName?: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @IsOptional()
  @IsStrongPassword()
  password?: string;
}