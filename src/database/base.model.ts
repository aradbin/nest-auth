import { Constructor, Model, QueryBuilderType, QueryContext, TransactionOrKnex } from 'objection';
import { CustomQueryBuilder } from './custom.query';

export class BaseModel extends Model {
    readonly id: number;
    created_at: string;
    created_by: number;
    updated_at: string;
    updated_by: number;
    deleted_at: string;
    deleted_by: number;

    QueryBuilderType!: CustomQueryBuilder<this>;
    static QueryBuilder = CustomQueryBuilder;

    $beforeInsert() {
        const request = (global as any).requestContext;
        this.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.created_by = request?.user?.id || null;
    }

    $beforeUpdate() {
        const request = (global as any).requestContext;
        this.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.updated_by = request?.user?.id || null;
    }
}