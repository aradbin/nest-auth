import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    try {
      const user = await this.usersService.create(createUserDto);
      return response.status(201).send({
        message: 'New User Created Successfully',
        data: user
      })
    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() response: Response) {
    try {
      const user = await this.usersService.update(+id, updateUserDto);
      return response.status(200).send({
        message: 'User Updated Successfully',
        data: user
      })
    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    try {
      const user = await this.usersService.remove(+id);
      return response.status(200).send({
        message: 'User Deleted Successfully',
        data: user
      })
    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }
}
