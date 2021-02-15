import {MigrationInterface, QueryRunner} from "typeorm";

export class skillsOptionsName1613376013252 implements MigrationInterface {
    name = 'skillsOptionsName1613376013252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."skills" RENAME COLUMN "option" TO "options_slugs"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."skills" RENAME COLUMN "options_slugs" TO "option"`);
    }

}
