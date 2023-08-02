import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterDto {
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Please provide valid email address' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}
