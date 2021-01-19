import {MigrationInterface, QueryRunner} from "typeorm";

export class addStatusRelations1608291725501 implements MigrationInterface {
    name = 'addStatusRelations1608291725501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blocking-reasons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "is_recoverable" boolean NOT NULL, CONSTRAINT "UQ_87b5053c0dc791b55b3cd299aba" UNIQUE ("name"), CONSTRAINT "PK_8e6f3107d92bd770e4fa2490218" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "freezing-reasons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, CONSTRAINT "UQ_42119ce9a0bc459ccedda27ed5b" UNIQUE ("name"), CONSTRAINT "PK_40fff166ae62aa1dfdcfb9721b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "revision-history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "entity_id" uuid NOT NULL, "change" character varying(128) NOT NULL, "reason_id" uuid, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_63f6910f30ef86a186c0455bcba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`INSERT INTO "blocking-reasons" (name, is_recoverable) VALUES ('Долгий период неактивности', true)`)
        await queryRunner.query(`INSERT INTO "blocking-reasons" (name, is_recoverable) VALUES ('Низкое качество услуги', false)`)
        await queryRunner.query(`INSERT INTO "blocking-reasons" (name, is_recoverable) VALUES ('Причинение ущерба', false)`)
        await queryRunner.query(`INSERT INTO "blocking-reasons" (name, is_recoverable) VALUES ('Временно не может с нами сотрудничать', true)`)
        await queryRunner.query(`INSERT INTO "blocking-reasons" (name, is_recoverable) VALUES ('Ушла/ушел на другую работу', true)`)
        await queryRunner.query(`INSERT INTO "blocking-reasons" (name, is_recoverable) VALUES ('Проблемы со здоровьем', true)`)
        await queryRunner.query(`INSERT INTO "blocking-reasons" (name, is_recoverable) VALUES ('Не устраивает график', true)`)
        await queryRunner.query(`INSERT INTO "blocking-reasons" (name, is_recoverable) VALUES ('Не выходит на назначенные заказы', false)`)
        await queryRunner.query(`INSERT INTO "blocking-reasons" (name, is_recoverable) VALUES ('Не прошла/прошел испытательный срок', false)`)
        await queryRunner.query(`INSERT INTO "blocking-reasons" (name, is_recoverable) VALUES ('Противоправные действия', false)`)
        await queryRunner.query(`INSERT INTO "blocking-reasons" (name, is_recoverable) VALUES ('Фрод', false)`)
        await queryRunner.query(`INSERT INTO "blocking-reasons" (name, is_recoverable) VALUES ('Некорректное поведение', false)`)
        await queryRunner.query(`INSERT INTO "blocking-reasons" (name, is_recoverable) VALUES ('Не оправдались ожидания по выплатам', true)`)
        await queryRunner.query(`INSERT INTO "blocking-reasons" (name, is_recoverable) VALUES ('Другое', true)`)
        await queryRunner.query(`INSERT INTO "freezing-reasons" (name) VALUES ('Болезнь')`)
        await queryRunner.query(`INSERT INTO "freezing-reasons" (name) VALUES ('Отпуск')`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "revision-history"`);
        await queryRunner.query(`DROP TABLE "freezing-reasons"`);
        await queryRunner.query(`DROP TABLE "blocking-reasons"`);
    }
}
