import {MigrationInterface, QueryRunner} from "typeorm";

export class addedIndexes1607089437745 implements MigrationInterface {
    name = 'addedIndexes1607089437745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "idx-compensations-grade_id" ON "hrm_core"."compensations" ("grade_id") `);
        await queryRunner.query(`CREATE INDEX "idx-grades-position_id" ON "hrm_core"."grades" ("position_id") `);
        await queryRunner.query(`CREATE INDEX "idx-grades-wage_id" ON "hrm_core"."grades" ("wage_id") `);
        await queryRunner.query(`CREATE INDEX "idx-wages-specialization_id" ON "hrm_core"."wages" ("specialization_id") `);
        await queryRunner.query(`CREATE INDEX "idx-wages-product_id" ON "hrm_core"."wages" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "idx-contracts-product_id" ON "hrm_core"."contracts" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "idx-contracts-specialization_id" ON "hrm_core"."contracts" ("specialization_id") `);
        await queryRunner.query(`CREATE INDEX "idx-contracts-grade_id" ON "hrm_core"."contracts" ("grade_id") `);
        await queryRunner.query(`CREATE INDEX "idx-contracts-wage_id" ON "hrm_core"."contracts" ("wage_id") `);
        await queryRunner.query(`CREATE INDEX "idx-contracts-contractor_id" ON "hrm_core"."contracts" ("contractor_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "hrm_core"."idx-contracts-contractor_id"`);
        await queryRunner.query(`DROP INDEX "hrm_core"."idx-contracts-wage_id"`);
        await queryRunner.query(`DROP INDEX "hrm_core"."idx-contracts-grade_id"`);
        await queryRunner.query(`DROP INDEX "hrm_core"."idx-contracts-specialization_id"`);
        await queryRunner.query(`DROP INDEX "hrm_core"."idx-contracts-product_id"`);
        await queryRunner.query(`DROP INDEX "hrm_core"."idx-wages-product_id"`);
        await queryRunner.query(`DROP INDEX "hrm_core"."idx-wages-specialization_id"`);
        await queryRunner.query(`DROP INDEX "hrm_core"."idx-grades-wage_id"`);
        await queryRunner.query(`DROP INDEX "hrm_core"."idx-grades-position_id"`);
        await queryRunner.query(`DROP INDEX "hrm_core"."idx-compensations-grade_id"`);
    }

}
