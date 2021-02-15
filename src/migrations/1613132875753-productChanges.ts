import {MigrationInterface, QueryRunner} from "typeorm";

export class productChanges1613132875753 implements MigrationInterface {
    name = 'productChanges1613132875753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."wages" ADD "product_slug" character varying NOT NULL`);
        await queryRunner.query(`UPDATE "public"."wages" SET "product_slug" = CASE
        WHEN "product_id" = '72b378c3-49f4-459e-a4d3-5ea1b0d014a0' THEN 'cleaning_flat_standard'
        WHEN "product_id" = 'f3200011-0deb-4beb-8c9b-a1038d57377f' THEN 'cleaning_flat_windows'
        ELSE 'cleaning_flat_deep'
        END`);
        await queryRunner.query(`DROP INDEX "public"."idx-wages-product_id"`);
        await queryRunner.query(`ALTER TABLE "public"."wages" DROP CONSTRAINT "FK_d3f5cd53af26c6e5314128ddf1e"`);
        await queryRunner.query(`ALTER TABLE "public"."wages" DROP COLUMN "product_id"`);

        await queryRunner.query(`ALTER TABLE "public"."contracts" ADD "product_slug" character varying NOT NULL`);
        await queryRunner.query(`UPDATE "public"."contracts" SET "product_slug" = CASE
        WHEN "product_id" = '72b378c3-49f4-459e-a4d3-5ea1b0d014a0' THEN 'cleaning_flat_standard'
        WHEN "product_id" = 'f3200011-0deb-4beb-8c9b-a1038d57377f' THEN 'cleaning_flat_windows'
        ELSE 'cleaning_flat_deep'
        END`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" DROP CONSTRAINT "FK_2d110b0c40496c1b9dfca42358d"`);
        await queryRunner.query(`DROP INDEX "public"."idx-contracts-product_id"`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" DROP COLUMN "product_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."contracts" DROP COLUMN "product_slug"`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" ADD "product_slug" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."wages" DROP COLUMN "product_slug"`);
        await queryRunner.query(`ALTER TABLE "public"."wages" ADD "product_slug" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."contracts" RENAME COLUMN "product_slug" TO "product_id"`);
        await queryRunner.query(`ALTER TABLE "public"."wages" RENAME COLUMN "product_slug" TO "product_id"`);
        await queryRunner.query(`CREATE INDEX "idx-contracts-product_id" ON "public"."contracts" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "idx-wages-product_id" ON "public"."wages" ("product_id") `);
        await queryRunner.query(`ALTER TABLE "public"."contracts" ADD CONSTRAINT "FK_2d110b0c40496c1b9dfca42358d" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."wages" ADD CONSTRAINT "FK_d3f5cd53af26c6e5314128ddf1e" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
