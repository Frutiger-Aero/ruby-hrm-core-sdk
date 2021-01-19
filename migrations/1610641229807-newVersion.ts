import {MigrationInterface, QueryRunner} from "typeorm";

export class newVersion1610641229807 implements MigrationInterface {
    name = 'newVersion1610641229807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('TRUNCATE "blocking-reasons"');
        await queryRunner.query(`CREATE TABLE "blocking-reasons-groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, CONSTRAINT "PK_f56297bfc34546eaed7fbc6665a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" DROP COLUMN "is_recoverable"`);
        await queryRunner.query(`ALTER TABLE "revision-history" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD "changed_status_reason_id" uuid`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" ADD "is_permanent" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" ADD "is_available_for_contractor" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" ADD "is_instant" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" ADD "is_need_retraining" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" ADD "is_common_block" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" ADD "group_id" uuid`);
        await queryRunner.query(`ALTER TABLE "revision-history" ADD "entity_type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "revision-history" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "contractors" ALTER COLUMN "status" SET DEFAULT 'CREATED'`);
        await queryRunner.query(`ALTER TABLE "contractors" ALTER COLUMN "work_status" SET DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_1b7a7a07fdbebe3c5036bfba30f"`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_3e5ee9701d7696d4432878cd3da"`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_fbc20b07516bca3f6feaef0072e"`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_118121557184962b890cec40ec8"`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_c7d566be2283413aba91ce6f425"`);
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "product_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "specialization_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "grade_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "wage_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "contractor_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "revision-history" DROP COLUMN "change"`);
        await queryRunner.query(`ALTER TABLE "revision-history" ADD "change" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_1b7a7a07fdbebe3c5036bfba30f" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_3e5ee9701d7696d4432878cd3da" FOREIGN KEY ("specialization_id") REFERENCES "specializations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_fbc20b07516bca3f6feaef0072e" FOREIGN KEY ("grade_id") REFERENCES "grades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_118121557184962b890cec40ec8" FOREIGN KEY ("wage_id") REFERENCES "wages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_c7d566be2283413aba91ce6f425" FOREIGN KEY ("contractor_id") REFERENCES "contractors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" ADD CONSTRAINT "FK_4755697c0ff8012d9bfd8605806" FOREIGN KEY ("group_id") REFERENCES "blocking-reasons-groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blocking-reasons" DROP CONSTRAINT "FK_4755697c0ff8012d9bfd8605806"`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_c7d566be2283413aba91ce6f425"`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_118121557184962b890cec40ec8"`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_fbc20b07516bca3f6feaef0072e"`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_3e5ee9701d7696d4432878cd3da"`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_1b7a7a07fdbebe3c5036bfba30f"`);
        await queryRunner.query(`ALTER TABLE "revision-history" DROP COLUMN "change"`);
        await queryRunner.query(`ALTER TABLE "revision-history" ADD "change" character varying(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "contractor_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "wage_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "grade_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "specialization_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "product_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "status" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_c7d566be2283413aba91ce6f425" FOREIGN KEY ("contractor_id") REFERENCES "contractors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_118121557184962b890cec40ec8" FOREIGN KEY ("wage_id") REFERENCES "wages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_fbc20b07516bca3f6feaef0072e" FOREIGN KEY ("grade_id") REFERENCES "grades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_3e5ee9701d7696d4432878cd3da" FOREIGN KEY ("specialization_id") REFERENCES "specializations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_1b7a7a07fdbebe3c5036bfba30f" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contractors" ALTER COLUMN "work_status" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "contractors" ALTER COLUMN "status" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "revision-history" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "revision-history" DROP COLUMN "entity_type"`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" DROP COLUMN "group_id"`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" DROP COLUMN "is_common_block"`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" DROP COLUMN "is_need_retraining"`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" DROP COLUMN "is_instant"`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" DROP COLUMN "is_available_for_contractor"`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" DROP COLUMN "is_permanent"`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" DROP COLUMN "is_deleted"`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "changed_status_reason_id"`);
        await queryRunner.query(`ALTER TABLE "revision-history" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "blocking-reasons" ADD "is_recoverable" boolean NOT NULL`);
        await queryRunner.query(`DROP TABLE "blocking-reasons-groups"`);
    }

}
