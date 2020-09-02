import {MigrationInterface, QueryRunner} from "typeorm";

export class init1599040931721 implements MigrationInterface {
    name = 'init1599040931721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hrm_core"."citizenship" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, CONSTRAINT "UQ_e7216dcd22fe3990b821881ad90" UNIQUE ("name"), CONSTRAINT "PK_6014423289336c433293a23a02f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hrm_core"."specialization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, CONSTRAINT "UQ_932be7443b870c16ce29463210e" UNIQUE ("name"), CONSTRAINT "PK_98eddb388051cc2be0f37fab5b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hrm_core"."tariff" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "time_range" text NOT NULL, "working_days" text array NOT NULL, "max_order_count" integer NOT NULL, CONSTRAINT "UQ_c44cfdee3dde219a9e2bbb7bda3" UNIQUE ("name"), CONSTRAINT "PK_3fc80027d7f9e7360844a6acdb0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hrm_core"."executor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP WITH TIME ZONE, "sso_id" character varying NOT NULL, "address" character varying NOT NULL, "photo" character varying, "accepted_use_terms" character varying, "citizenship" character varying, "passport" text NOT NULL, "status" smallint NOT NULL, "status_reason" character varying, "status_date" character varying, "rating" double precision NOT NULL DEFAULT 0, "tariff_id" uuid, CONSTRAINT "UQ_2c8cf4db046110ea173735d8db8" UNIQUE ("sso_id"), CONSTRAINT "PK_08a1aecf4d1a693a51ee75149fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hrm_core"."executor_specialization_specialization" ("executorId" uuid NOT NULL, "specializationId" uuid NOT NULL, CONSTRAINT "PK_0d504369223c1f6c0fbdee92b19" PRIMARY KEY ("executorId", "specializationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_185eb8c1d71bd43f17b70b5aed" ON "hrm_core"."executor_specialization_specialization" ("executorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a856632514bcbb8d15d53506fc" ON "hrm_core"."executor_specialization_specialization" ("specializationId") `);
        await queryRunner.query(`ALTER TABLE "hrm_core"."executor" ADD CONSTRAINT "FK_1dd5e70068be541ffaac2733136" FOREIGN KEY ("tariff_id") REFERENCES "hrm_core"."tariff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."executor_specialization_specialization" ADD CONSTRAINT "FK_185eb8c1d71bd43f17b70b5aed3" FOREIGN KEY ("executorId") REFERENCES "hrm_core"."executor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."executor_specialization_specialization" ADD CONSTRAINT "FK_a856632514bcbb8d15d53506fc2" FOREIGN KEY ("specializationId") REFERENCES "hrm_core"."specialization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hrm_core"."executor_specialization_specialization" DROP CONSTRAINT "FK_a856632514bcbb8d15d53506fc2"`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."executor_specialization_specialization" DROP CONSTRAINT "FK_185eb8c1d71bd43f17b70b5aed3"`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."executor" DROP CONSTRAINT "FK_1dd5e70068be541ffaac2733136"`);
        await queryRunner.query(`DROP INDEX "hrm_core"."IDX_a856632514bcbb8d15d53506fc"`);
        await queryRunner.query(`DROP INDEX "hrm_core"."IDX_185eb8c1d71bd43f17b70b5aed"`);
        await queryRunner.query(`DROP TABLE "hrm_core"."executor_specialization_specialization"`);
        await queryRunner.query(`DROP TABLE "hrm_core"."executor"`);
        await queryRunner.query(`DROP TABLE "hrm_core"."tariff"`);
        await queryRunner.query(`DROP TABLE "hrm_core"."specialization"`);
        await queryRunner.query(`DROP TABLE "hrm_core"."citizenship"`);
    }

}
