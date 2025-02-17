import {MigrationInterface, QueryRunner} from "typeorm";

export class addWageType1608118981985 implements MigrationInterface {
    name = 'addWageType1608118981985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wages" ADD "type" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wages" DROP COLUMN "type"`);
    }

}
