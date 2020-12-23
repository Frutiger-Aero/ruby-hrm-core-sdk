import {MigrationInterface, QueryRunner} from "typeorm";

export class addSkill1608651455939 implements MigrationInterface {
    name = 'addSkill1608651455939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hrm_core"."skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP WITH TIME ZONE, "title" character varying(128) NOT NULL, "name" character varying(128) NOT NULL, "option" character varying(128) NOT NULL, CONSTRAINT "UQ_aff43457005410372aec525f20a" UNIQUE ("name"), CONSTRAINT "PK_bcbd7215b9cef5de0a232163d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hrm_core"."contracts_skills" ("contractsId" uuid NOT NULL, "skillsId" uuid NOT NULL, CONSTRAINT "PK_c058cf3f27d383f619c75a6b8ce" PRIMARY KEY ("contractsId", "skillsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bf9ad97a99b4b7b0ce618515dd" ON "hrm_core"."contracts_skills" ("contractsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_18da3685cf987ec3c98907da96" ON "hrm_core"."contracts_skills" ("skillsId") `);
        await queryRunner.query(`ALTER TABLE "hrm_core"."contracts_skills" ADD CONSTRAINT "FK_bf9ad97a99b4b7b0ce618515dd3" FOREIGN KEY ("contractsId") REFERENCES "hrm_core"."contracts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."contracts_skills" ADD CONSTRAINT "FK_18da3685cf987ec3c98907da960" FOREIGN KEY ("skillsId") REFERENCES "hrm_core"."skills"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hrm_core"."contracts_skills" DROP CONSTRAINT "FK_18da3685cf987ec3c98907da960"`);
        await queryRunner.query(`ALTER TABLE "hrm_core"."contracts_skills" DROP CONSTRAINT "FK_bf9ad97a99b4b7b0ce618515dd3"`);
        await queryRunner.query(`DROP INDEX "hrm_core"."IDX_18da3685cf987ec3c98907da96"`);
        await queryRunner.query(`DROP INDEX "hrm_core"."IDX_bf9ad97a99b4b7b0ce618515dd"`);
        await queryRunner.query(`DROP TABLE "hrm_core"."contracts_skills"`);
        await queryRunner.query(`DROP TABLE "hrm_core"."skills"`);
    }

}
