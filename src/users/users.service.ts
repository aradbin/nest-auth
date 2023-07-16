import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, DeleteUserDto } from './users.dto';
import { ModelClass } from 'objection';
import { UserModel } from 'src/database/models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserModel') private modelClass: ModelClass<UserModel>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.modelClass.query().insert(createUserDto)
    return user;
  }

  findAll() {
    return this.modelClass.query().where('deleted_at', null)
  }

  findOne(id: number) {
    return this.modelClass.query().findById(id)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ')
    updateUserDto.updated_by = null
    await this.modelClass.query().findById(id).update(updateUserDto)
    const user = await this.modelClass.query().findById(id)
    
    return user;
  }

  async remove(id: number) {
    const deleteUserDto: DeleteUserDto = {
      deleted_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      deleted_by: null
    }
    await this.modelClass.query().findById(id).update(deleteUserDto)
    
    return id;
  }
}
