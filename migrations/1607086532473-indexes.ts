import {MigrationInterface, QueryRunner} from "typeorm";

export class indexes1607086532473 implements MigrationInterface {
    name = 'indexes1607086532473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_b0acd5e28425109560db24498c" ON "hrm_core"."compensations" ("grade_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_0a34b9b8d574307510c225eda4" ON "hrm_core"."grades" ("wage_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_bd9a6815f42a06679154a4beeb" ON "hrm_core"."wages" ("specialization_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_bb5252f2a58198c3e2d490485b" ON "hrm_core"."wages" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1b7a7a07fdbebe3c5036bfba30" ON "hrm_core"."contracts" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3e5ee9701d7696d4432878cd3d" ON "hrm_core"."contracts" ("specialization_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_fbc20b07516bca3f6feaef0072" ON "hrm_core"."contracts" ("grade_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_118121557184962b890cec40ec" ON "hrm_core"."contracts" ("wage_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c7d566be2283413aba91ce6f42" ON "hrm_core"."contracts" ("contractor_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "hrm_core"."IDX_c7d566be2283413aba91ce6f42"`);
        await queryRunner.query(`DROP INDEX "hrm_core"."IDX_118121557184962b890cec40ec"`);
        await queryRunner.query(`DROP INDEX "hrm_core"."IDX_fbc20b07516bca3f6feaef0072"`);
        await queryRunner.query(`DROP INDEX "hrm_core"."IDX_3e5ee9701d7696d4432878cd3d"`);
        await queryRunner.query(`DROP INDEX "hrm_core"."IDX_1b7a7a07fdbebe3c5036bfba30"`);
        await queryRunner.query(`DROP INDEX "hrm_core"."IDX_bb5252f2a58198c3e2d490485b"`);
        await queryRunner.query(`DROP INDEX "hrm_core"."IDX_bd9a6815f42a06679154a4beeb"`);
        await queryRunner.query(`DROP INDEX "hrm_core"."IDX_0a34b9b8d574307510c225eda4"`);
        await queryRunner.query(`DROP INDEX "hrm_core"."IDX_b0acd5e28425109560db24498c"`);
    }

}
