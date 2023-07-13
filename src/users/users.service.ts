import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ModelClass } from 'objection';
import { UserModel } from 'src/database/models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserModel') private modelClass: ModelClass<UserModel>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.modelClass.query().insert(
      createUserDto,
    );
    return user;
  }

  findAll() {
    return this.modelClass.query().where('deleted_at', null)
  }

  findOne(id: number) {
    return this.modelClass.query().findById(id)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
