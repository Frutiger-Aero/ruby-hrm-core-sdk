import {MigrationInterface, QueryRunner} from "typeorm";

export class compensationOptionSlug1613460860630 implements MigrationInterface {
    name = 'compensationOptionSlug1613460860630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."compensations" RENAME COLUMN "option" TO "option_slug"`);
        await queryRunner.query(`ALTER TABLE "public"."wages" ALTER COLUMN "product_slug" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" ALTER COLUMN "product_slug" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."contracts" ALTER COLUMN "product_slug" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."wages" ALTER COLUMN "product_slug" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."compensations" RENAME COLUMN "option_slug" TO "option"`);
    }

}
