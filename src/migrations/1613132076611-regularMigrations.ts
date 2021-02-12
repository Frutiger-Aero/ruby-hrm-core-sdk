import {MigrationInterface, QueryRunner} from "typeorm";

export class regularMigrations1613132076611 implements MigrationInterface {
    name = 'regularMigrations1613132076611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."compensations" DROP CONSTRAINT "FK_b0acd5e28425109560db24498c3"`);
        await queryRunner.query(`ALTER TABLE "public"."grades" DROP CONSTRAINT "FK_0a34b9b8d574307510c225eda43"`);
        await queryRunner.query(`ALTER TABLE "public"."grades" DROP CONSTRAINT "FK_870f1a3a2ca9bc9840bb6cc974c"`);
        await queryRunner.query(`ALTER TABLE "public"."wages" DROP CONSTRAINT "FK_bb5252f2a58198c3e2d490485be"`);
        await queryRunner.query(`ALTER TABLE "public"."wages" DROP CONSTRAINT "FK_bd9a6815f42a06679154a4beebf"`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" DROP CONSTRAINT "FK_118121557184962b890cec40ec8"`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" DROP CONSTRAINT "FK_1b7a7a07fdbebe3c5036bfba30f"`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" DROP CONSTRAINT "FK_3e5ee9701d7696d4432878cd3da"`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" DROP CONSTRAINT "FK_c7d566be2283413aba91ce6f425"`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" DROP CONSTRAINT "FK_fbc20b07516bca3f6feaef0072e"`);
        await queryRunner.query(`ALTER TABLE "public"."blocking-reasons" DROP CONSTRAINT "FK_4755697c0ff8012d9bfd8605806"`);
        await queryRunner.query(`ALTER TABLE "public"."contracts_skills" DROP CONSTRAINT "FK_18da3685cf987ec3c98907da960"`);
        await queryRunner.query(`ALTER TABLE "public"."contracts_skills" DROP CONSTRAINT "FK_bf9ad97a99b4b7b0ce618515dd3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bf9ad97a99b4b7b0ce618515dd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_18da3685cf987ec3c98907da96"`);
        await queryRunner.query(`CREATE INDEX "IDX_9c10b8a73a0fecc2d8803ac863" ON "public"."contracts_skills" ("contractsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0a59daeba7f4f63da5e30e28b1" ON "public"."contracts_skills" ("skillsId") `);
        await queryRunner.query(`ALTER TABLE "public"."compensations" ADD CONSTRAINT "FK_1071b74cf2fef5340c40a33a756" FOREIGN KEY ("grade_id") REFERENCES "public"."grades"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."grades" ADD CONSTRAINT "FK_fd93a7a9f3057e731e1e1b4755a" FOREIGN KEY ("position_id") REFERENCES "public"."positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."grades" ADD CONSTRAINT "FK_ea7bf045ef654c0cfedc2ae13cc" FOREIGN KEY ("wage_id") REFERENCES "public"."wages"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."wages" ADD CONSTRAINT "FK_5946eb325bd8acc0a2c80a80623" FOREIGN KEY ("specialization_id") REFERENCES "public"."specializations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."wages" ADD CONSTRAINT "FK_d3f5cd53af26c6e5314128ddf1e" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" ADD CONSTRAINT "FK_2d110b0c40496c1b9dfca42358d" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" ADD CONSTRAINT "FK_d21a37e6ec7da8ced86f55b4eef" FOREIGN KEY ("specialization_id") REFERENCES "public"."specializations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" ADD CONSTRAINT "FK_2739bca48d88db9e0af23d5bf11" FOREIGN KEY ("grade_id") REFERENCES "public"."grades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" ADD CONSTRAINT "FK_1286d33b3d0aa4629dc85628f14" FOREIGN KEY ("wage_id") REFERENCES "public"."wages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" ADD CONSTRAINT "FK_f1b90b5d1581ad54e3e4c2ec2ad" FOREIGN KEY ("contractor_id") REFERENCES "public"."contractors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."blocking-reasons" ADD CONSTRAINT "FK_605163798fa31b8b23069ac0f58" FOREIGN KEY ("group_id") REFERENCES "public"."blocking-reasons-groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."contracts_skills" ADD CONSTRAINT "FK_9c10b8a73a0fecc2d8803ac863d" FOREIGN KEY ("contractsId") REFERENCES "public"."contracts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."contracts_skills" ADD CONSTRAINT "FK_0a59daeba7f4f63da5e30e28b13" FOREIGN KEY ("skillsId") REFERENCES "public"."skills"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."contracts_skills" DROP CONSTRAINT "FK_0a59daeba7f4f63da5e30e28b13"`);
        await queryRunner.query(`ALTER TABLE "public"."contracts_skills" DROP CONSTRAINT "FK_9c10b8a73a0fecc2d8803ac863d"`);
        await queryRunner.query(`ALTER TABLE "public"."blocking-reasons" DROP CONSTRAINT "FK_605163798fa31b8b23069ac0f58"`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" DROP CONSTRAINT "FK_f1b90b5d1581ad54e3e4c2ec2ad"`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" DROP CONSTRAINT "FK_1286d33b3d0aa4629dc85628f14"`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" DROP CONSTRAINT "FK_2739bca48d88db9e0af23d5bf11"`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" DROP CONSTRAINT "FK_d21a37e6ec7da8ced86f55b4eef"`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" DROP CONSTRAINT "FK_2d110b0c40496c1b9dfca42358d"`);
        await queryRunner.query(`ALTER TABLE "public"."wages" DROP CONSTRAINT "FK_d3f5cd53af26c6e5314128ddf1e"`);
        await queryRunner.query(`ALTER TABLE "public"."wages" DROP CONSTRAINT "FK_5946eb325bd8acc0a2c80a80623"`);
        await queryRunner.query(`ALTER TABLE "public"."grades" DROP CONSTRAINT "FK_ea7bf045ef654c0cfedc2ae13cc"`);
        await queryRunner.query(`ALTER TABLE "public"."grades" DROP CONSTRAINT "FK_fd93a7a9f3057e731e1e1b4755a"`);
        await queryRunner.query(`ALTER TABLE "public"."compensations" DROP CONSTRAINT "FK_1071b74cf2fef5340c40a33a756"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0a59daeba7f4f63da5e30e28b1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9c10b8a73a0fecc2d8803ac863"`);
        await queryRunner.query(`CREATE INDEX "IDX_18da3685cf987ec3c98907da96" ON "public"."contracts_skills" ("skillsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bf9ad97a99b4b7b0ce618515dd" ON "public"."contracts_skills" ("contractsId") `);
        await queryRunner.query(`ALTER TABLE "public"."contracts_skills" ADD CONSTRAINT "FK_bf9ad97a99b4b7b0ce618515dd3" FOREIGN KEY ("contractsId") REFERENCES "public"."contracts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."contracts_skills" ADD CONSTRAINT "FK_18da3685cf987ec3c98907da960" FOREIGN KEY ("skillsId") REFERENCES "public"."skills"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."blocking-reasons" ADD CONSTRAINT "FK_4755697c0ff8012d9bfd8605806" FOREIGN KEY ("group_id") REFERENCES "public"."blocking-reasons-groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" ADD CONSTRAINT "FK_fbc20b07516bca3f6feaef0072e" FOREIGN KEY ("grade_id") REFERENCES "public"."grades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" ADD CONSTRAINT "FK_c7d566be2283413aba91ce6f425" FOREIGN KEY ("contractor_id") REFERENCES "public"."contractors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" ADD CONSTRAINT "FK_3e5ee9701d7696d4432878cd3da" FOREIGN KEY ("specialization_id") REFERENCES "public"."specializations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" ADD CONSTRAINT "FK_1b7a7a07fdbebe3c5036bfba30f" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" ADD CONSTRAINT "FK_118121557184962b890cec40ec8" FOREIGN KEY ("wage_id") REFERENCES "public"."wages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."wages" ADD CONSTRAINT "FK_bd9a6815f42a06679154a4beebf" FOREIGN KEY ("specialization_id") REFERENCES "public"."specializations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."wages" ADD CONSTRAINT "FK_bb5252f2a58198c3e2d490485be" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."grades" ADD CONSTRAINT "FK_870f1a3a2ca9bc9840bb6cc974c" FOREIGN KEY ("position_id") REFERENCES "public"."positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."grades" ADD CONSTRAINT "FK_0a34b9b8d574307510c225eda43" FOREIGN KEY ("wage_id") REFERENCES "public"."wages"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."compensations" ADD CONSTRAINT "FK_b0acd5e28425109560db24498c3" FOREIGN KEY ("grade_id") REFERENCES "public"."grades"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
