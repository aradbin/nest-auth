import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserModel') private modelClass: ModelClass<UserModel>
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.modelClass.query().insert(createUserDto);
  }

  async findAll(params: any = {}) {
    return await this.modelClass.query().find().paginate(params)
  }

  async findOne(id: number) {
    return await this.modelClass.query().find().findById(id)
  }

  async findByEmail(email: string) {
    return await this.modelClass.query().find().where('email', email).first()
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.modelClass.query().findById(id).update(updateUserDto)
    
    return user
  }

  async remove(id: number) {
    return await this.modelClass.query().softDelete(id)
  }
}
