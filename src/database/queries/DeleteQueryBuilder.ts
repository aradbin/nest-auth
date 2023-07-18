import { Model, Page, QueryBuilder } from "objection";

export class DeleteQueryBuilder<M extends Model, R = M[]> extends QueryBuilder<M, R> {
    // These are necessary for typescript
    ArrayQueryBuilderType!: DeleteQueryBuilder<M, M[]>;
    SingleQueryBuilderType!: DeleteQueryBuilder<M, M>;
    MaybeSingleQueryBuilderType!: DeleteQueryBuilder<M, M | undefined>;
    NumberQueryBuilderType!: DeleteQueryBuilder<M, number>;
    PageQueryBuilderType!: DeleteQueryBuilder<M, Page<M>>;

    softDelete() {
        const patch = {};
        patch['deleted_at'] = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
        return this.patch(patch);
    }
}