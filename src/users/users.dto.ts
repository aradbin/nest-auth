import { PartialType } from "@nestjs/mapped-types";

export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    verified: boolean;
    created_at: string;
    created_by: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
    updated_at: string;
    updated_by: number;
}

export class DeleteUserDto extends PartialType(UpdateUserDto) {
    deleted_at: string;
    deleted_by: number;
}