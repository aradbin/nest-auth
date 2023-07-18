import { Model, StaticHookArguments } from 'objection';

export class BaseModel extends Model {
    readonly id: number;
    created_at: string;
    created_by: number;
    updated_at: string;
    updated_by: number;
    deleted_at: string;
    deleted_by: number;

    $beforeInsert() {
        this.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    $beforeUpdate() {
        this.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    static async beforeDelete(args: StaticHookArguments<any, any>) {
        const softDelete = await args.asFindQuery().update({
            deleted_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        });
        
        args.cancelQuery(softDelete);
    }
}