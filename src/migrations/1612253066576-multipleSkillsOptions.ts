import {MigrationInterface, QueryRunner} from "typeorm";

export class multipleSkillsOptions1612253066576 implements MigrationInterface {
    name = 'multipleSkillsOptions1612253066576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."skills" DROP COLUMN "option"`);
        await queryRunner.query(`ALTER TABLE "public"."skills" ADD "option" character varying(128) array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."skills" DROP COLUMN "option"`);
        await queryRunner.query(`ALTER TABLE "public"."skills" ADD "option" character varying(128) NOT NULL`);
    }

}
