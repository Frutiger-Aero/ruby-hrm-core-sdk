import {MigrationInterface, QueryRunner} from "typeorm";

export class fixes1614155160095 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE public.wages
                SET product_slug='cleaning_flat_deep'
                WHERE id='ea612b48-44df-453f-a98c-d3ba52a4db4b';
        `);
        await queryRunner.query('DROP TABLE products;')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
