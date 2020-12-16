import {MigrationInterface, QueryRunner} from "typeorm";

export class addHandbooksValues1608121283138 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "hrm_core"."products" (title, name) VALUES ('Генеральная уборка', 'cleaning_flat_deep')`)
        await queryRunner.query(`INSERT INTO "hrm_core"."products" (title, name) VALUES ('Уборка после ремонта', 'cleaning_flat_renovation')`)
        await queryRunner.query(`INSERT INTO "hrm_core"."products" (title, name) VALUES ('Химчистка', 'dry_cleaning')`)
        await queryRunner.query(`INSERT INTO "hrm_core"."specializations" (title, name) VALUES ('Клинер', 'cleaner')`)
        await queryRunner.query(`INSERT INTO "hrm_core"."specializations" (title, name) VALUES ('Курьер', 'courier')`)
        await queryRunner.query(`INSERT INTO "hrm_core"."positions" (title, name) VALUES ('Линейный', 'regular')`)
        await queryRunner.query(`INSERT INTO "hrm_core"."positions" (title, name) VALUES ('Старший', 'senior')`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
