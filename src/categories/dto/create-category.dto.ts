import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty({ message: 'Name is required' })
    name: string

    @IsOptional()
    @IsNumber()
    parent_id: number

    @IsOptional()
    created_at: string

    @IsOptional()
    created_by: number
}
