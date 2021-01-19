import {MigrationInterface, QueryRunner} from "typeorm";

export class addedIndexes1607089437745 implements MigrationInterface {
    name = 'addedIndexes1607089437745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "idx-compensations-grade_id" ON "compensations" ("grade_id") `);
        await queryRunner.query(`CREATE INDEX "idx-grades-position_id" ON "grades" ("position_id") `);
        await queryRunner.query(`CREATE INDEX "idx-grades-wage_id" ON "grades" ("wage_id") `);
        await queryRunner.query(`CREATE INDEX "idx-wages-specialization_id" ON "wages" ("specialization_id") `);
        await queryRunner.query(`CREATE INDEX "idx-wages-product_id" ON "wages" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "idx-contracts-product_id" ON "contracts" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "idx-contracts-specialization_id" ON "contracts" ("specialization_id") `);
        await queryRunner.query(`CREATE INDEX "idx-contracts-grade_id" ON "contracts" ("grade_id") `);
        await queryRunner.query(`CREATE INDEX "idx-contracts-wage_id" ON "contracts" ("wage_id") `);
        await queryRunner.query(`CREATE INDEX "idx-contracts-contractor_id" ON "contracts" ("contractor_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "idx-contracts-contractor_id"`);
        await queryRunner.query(`DROP INDEX "idx-contracts-wage_id"`);
        await queryRunner.query(`DROP INDEX "idx-contracts-grade_id"`);
        await queryRunner.query(`DROP INDEX "idx-contracts-specialization_id"`);
        await queryRunner.query(`DROP INDEX "idx-contracts-product_id"`);
        await queryRunner.query(`DROP INDEX "idx-wages-product_id"`);
        await queryRunner.query(`DROP INDEX "idx-wages-specialization_id"`);
        await queryRunner.query(`DROP INDEX "idx-grades-wage_id"`);
        await queryRunner.query(`DROP INDEX "idx-grades-position_id"`);
        await queryRunner.query(`DROP INDEX "idx-compensations-grade_id"`);
    }

}
