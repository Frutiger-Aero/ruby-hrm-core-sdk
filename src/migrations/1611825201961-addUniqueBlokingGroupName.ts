import {MigrationInterface, QueryRunner} from "typeorm";

export class addUniqueBlokingGroupName1611825201961 implements MigrationInterface {
    name = 'addUniqueBlokingGroupName1611825201961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE TABLE public."blocking-reasons-groups" CONTINUE IDENTITY CASCADE;`);
        await queryRunner.query(`ALTER TABLE "public"."blocking-reasons-groups" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "public"."blocking-reasons-groups" ADD "name" character varying(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."blocking-reasons-groups" ADD CONSTRAINT "UQ_86fc07f1697d425c3f8916deefe" UNIQUE ("name")`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."blocking-reasons-groups" DROP CONSTRAINT "UQ_86fc07f1697d425c3f8916deefe"`);
        await queryRunner.query(`ALTER TABLE "public"."blocking-reasons-groups" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "public"."blocking-reasons-groups" ADD "name" character varying NOT NULL`);
    }

}
