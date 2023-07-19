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
    const user = await this.modelClass.query().insertAndFetch(createUserDto)
    
    return user;
  }

  findAll(params: any = {}) {
    return this.modelClass.query().paginate(params)
  }

  findOne(id: number) {
    return this.modelClass.query().find().findById(id)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.modelClass.query().updateAndFetchById(id, updateUserDto)
    
    return user
  }

  async remove(id: number) {
    await this.modelClass.query().findById(id).delete()
    
    return id
  }
}
