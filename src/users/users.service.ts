import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { UserModel } from 'src/database/models/user.model';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserModel') private modelClass: ModelClass<UserModel>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.modelClass.query().insertAndFetch(createUserDto)
    
    return user;
  }

  findAll() {
    return this.modelClass.query().where('deleted_at', null)
  }

  findOne(id: number) {
    return this.modelClass.query().findById(id).where('deleted_at', null)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.modelClass.query().updateAndFetchById(id, updateUserDto).where('deleted_at', null)
    
    return user
  }

  async remove(id: number) {
    await this.modelClass.query().findById(id).softDelete().where('deleted_at', null)
    
    return id
  }
}
