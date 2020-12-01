import {MigrationInterface, QueryRunner} from "typeorm";

export class initV11606828817653 implements MigrationInterface {
    name = 'initV11606828817653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hrm_core"."specializations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP WITH TIME ZONE, "title" character varying(128) NOT NULL, "name" character varying(128) NOT NULL, CONSTRAINT "UQ_09b28d143d7f2ad5ba6baf8bc2c" UNIQUE ("name"), CONSTRAINT "PK_6d5b178fad191ba348fe6df0411" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hrm_core"."products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP WITH TIME ZONE, "title" character varying(128) NOT NULL, "name" character varying(128) NOT NULL, CONSTRAINT "UQ_a36c0e7a9f51f47ee366d48ba2e" UNIQUE ("name"), CONSTRAINT "PK_4091fb7844a5ebe57e98220a26e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hrm_core"."positions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP WITH TIME ZONE, "title" character varying(128) NOT NULL, "name" character varying(128) NOT NULL, CONSTRAINT "UQ_ae93e77840e2e7d9dc5e6733b12" UNIQUE ("name"), CONSTRAINT "PK_19bc326f0c2013191e36711930d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hrm_core"."compensations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "type" character varying NOT NULL DEFAULT 'fixed', "option" character varying NOT NULL, "grade_id" uuid, CONSTRAINT "PK_245c43116f1346cf8cf722ec9b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hrm_core"."grades" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "position_id" uuid, "wage_id" uuid, "rate_amount" integer NOT NULL, "rate_type" character varying NOT NULL DEFAULT 'fixed', "rate_unit" character varying NOT NULL DEFAULT 'SERVICE', CONSTRAINT "PK_2b6e157e48c9167e5b4b843934a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hrm_core"."wages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying(128) NOT NULL, "specialization_id" uuid, "product_id" uuid, CONSTRAINT "UQ_c9411de892f077fa5ff9a5bd9ce" UNIQUE ("name"), CONSTRAINT "PK_ec534e4c145b8474f7142711b2b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hrm_core"."contractors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" uuid, "status" character varying NOT NULL DEFAULT 0, "work_status" character varying NOT NULL DEFAULT 0, "rating" double precision NOT NULL DEFAULT 0, CONSTRAINT "UQ_e797aed3bf5e904fb29811c7d7a" UNIQUE ("user_id"), CONSTRAINT "PK_66f77d8014c26071d71cdc193c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hrm_core"."contracts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP WITH TIME ZONE, "status" character varying NOT NULL DEFAULT 0, "product_id" uuid, "specialization_id" uuid, "grade_id" uuid, "wage_id" uuid, "contractor_id" uuid, CONSTRAINT "PK_c8551d78ce389043d55cc70ad7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."compensations" ADD CONSTRAINT "FK_b0acd5e28425109560db24498c3" FOREIGN KEY ("grade_id") REFERENCES "hrm_core"."grades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."grades" ADD CONSTRAINT "FK_870f1a3a2ca9bc9840bb6cc974c" FOREIGN KEY ("position_id") REFERENCES "hrm_core"."positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."grades" ADD CONSTRAINT "FK_0a34b9b8d574307510c225eda43" FOREIGN KEY ("wage_id") REFERENCES "hrm_core"."wages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."wages" ADD CONSTRAINT "FK_bd9a6815f42a06679154a4beebf" FOREIGN KEY ("specialization_id") REFERENCES "hrm_core"."specializations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."wages" ADD CONSTRAINT "FK_bb5252f2a58198c3e2d490485be" FOREIGN KEY ("product_id") REFERENCES "hrm_core"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."contracts" ADD CONSTRAINT "FK_1b7a7a07fdbebe3c5036bfba30f" FOREIGN KEY ("product_id") REFERENCES "hrm_core"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."contracts" ADD CONSTRAINT "FK_3e5ee9701d7696d4432878cd3da" FOREIGN KEY ("specialization_id") REFERENCES "hrm_core"."specializations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."contracts" ADD CONSTRAINT "FK_fbc20b07516bca3f6feaef0072e" FOREIGN KEY ("grade_id") REFERENCES "hrm_core"."grades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."contracts" ADD CONSTRAINT "FK_118121557184962b890cec40ec8" FOREIGN KEY ("wage_id") REFERENCES "hrm_core"."wages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."contracts" ADD CONSTRAINT "FK_c7d566be2283413aba91ce6f425" FOREIGN KEY ("contractor_id") REFERENCES "hrm_core"."contractors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hrm_core"."contracts" DROP CONSTRAINT "FK_c7d566be2283413aba91ce6f425"`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."contracts" DROP CONSTRAINT "FK_118121557184962b890cec40ec8"`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."contracts" DROP CONSTRAINT "FK_fbc20b07516bca3f6feaef0072e"`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."contracts" DROP CONSTRAINT "FK_3e5ee9701d7696d4432878cd3da"`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."contracts" DROP CONSTRAINT "FK_1b7a7a07fdbebe3c5036bfba30f"`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."wages" DROP CONSTRAINT "FK_bb5252f2a58198c3e2d490485be"`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."wages" DROP CONSTRAINT "FK_bd9a6815f42a06679154a4beebf"`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."grades" DROP CONSTRAINT "FK_0a34b9b8d574307510c225eda43"`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."grades" DROP CONSTRAINT "FK_870f1a3a2ca9bc9840bb6cc974c"`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."compensations" DROP CONSTRAINT "FK_b0acd5e28425109560db24498c3"`);
        await queryRunner.query(`DROP TABLE "hrm_core"."contracts"`);
        await queryRunner.query(`DROP TABLE "hrm_core"."contractors"`);
        await queryRunner.query(`DROP TABLE "hrm_core"."wages"`);
        await queryRunner.query(`DROP TABLE "hrm_core"."grades"`);
        await queryRunner.query(`DROP TABLE "hrm_core"."compensations"`);
        await queryRunner.query(`DROP TABLE "hrm_core"."positions"`);
        await queryRunner.query(`DROP TABLE "hrm_core"."products"`);
        await queryRunner.query(`DROP TABLE "hrm_core"."specializations"`);
    }

}
