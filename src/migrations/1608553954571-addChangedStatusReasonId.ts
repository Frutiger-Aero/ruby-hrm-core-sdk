import {MigrationInterface, QueryRunner} from "typeorm";

export class addChangedStatusReasonId1608553954571 implements MigrationInterface {
    name = 'addChangedStatusReasonId1608553954571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contractors" ADD "changed_status_reason_id" uuid`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contractors" DROP COLUMN "changed_status_reason_id"`);
    }

}
