import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from './Register.dto';

export class LoginDto extends PartialType(RegisterDto) {
    username?: string;
    password?: string;
}
