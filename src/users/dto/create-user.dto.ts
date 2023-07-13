export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    verified: boolean;
    created_at: string;
    created_by: number;
}
