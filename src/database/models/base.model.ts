import { Model } from 'objection';
import { DeleteQueryBuilder } from '../queries/DeleteQueryBuilder';

export class BaseModel extends Model {
    readonly id: number;
    created_at: string;
    created_by: number;
    updated_at: string;
    updated_by: number;
    deleted_at: string;
    deleted_by: number;

    QueryBuilderType!: DeleteQueryBuilder<this>;
    static QueryBuilder = DeleteQueryBuilder;

    $beforeInsert() {
        this.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    $beforeUpdate() {
        this.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
}