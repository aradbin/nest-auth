import { BaseModel } from "src/database/base.model";

export class UserModel extends BaseModel {
  static tableName = 'users';

  // name: string;
  // email: string;
  // contact: string;
  // password: string;
  // verified: boolean;

  static jsonSchema = {
    type: 'object',
    required: ['contact'],
    properties: {
      contact: { type: 'string', minLength: 1, maxLength: 20 },
    },
  }
}