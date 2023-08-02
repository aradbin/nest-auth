import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ModelClass } from 'objection';
import { CategoryModel } from './category.model';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CategoryModel') private modelClass: ModelClass<CategoryModel>
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.modelClass.query().insert(createCategoryDto)
  }

  async findAll(params: any = {}) {
    return await this.modelClass.query().find().paginate(params).withGraphFetched('[parent,children]')
  }

  async findOne(id: number) {
    const data = await this.modelClass.query().find().findById(id).withGraphFetched('[parent,children]')
    if(!data){
      throw new NotFoundException('User not found')
    }
    return data
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.modelClass.query().findById(id).update(updateCategoryDto)
  }

  async remove(id: number) {
    return await this.modelClass.query().softDelete(id)
  }
}
