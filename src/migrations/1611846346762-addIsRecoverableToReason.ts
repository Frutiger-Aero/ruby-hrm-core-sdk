import {MigrationInterface, QueryRunner} from "typeorm";

export class addIsRecoverableToReason1611846346762 implements MigrationInterface {
    name = 'addIsRecoverableToReason1611846346762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."blocking-reasons" RENAME COLUMN "is_permanent" TO "is_recoverable"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."blocking-reasons" RENAME COLUMN "is_recoverable" TO "is_permanent"`);
    }

}
