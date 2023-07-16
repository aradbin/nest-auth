import { Model } from 'objection';

export class BaseModel extends Model {
    readonly id: number;
    created_at: string;
    created_by: number;
    updated_at: string;
    updated_by: number;
    deleted_at: string;
    deleted_by: number;

    softDelete(){
        this.$query().update({
            deleted_at: 'asd'
        })
    }
}