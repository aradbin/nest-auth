import { Model } from "objection";
import { BaseModel } from "src/database/base.model";

export class CategoryModel extends BaseModel {
  static tableName = 'categories';

  static relationMappings = {
    parent: {
      relation: Model.BelongsToOneRelation,
      modelClass: CategoryModel,
      join: {
        from: 'categories.parent_id',
        to: 'categories.id'
      }
    },
    children: {
      relation: Model.HasManyRelation,
      modelClass: CategoryModel,
      join: {
        from: 'categories.id',
        to: 'categories.parent_id'
      }
    }
  }
}