import {MigrationInterface, QueryRunner} from "typeorm";

export class fillCatalogue1612258708774 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "freezing-reasons"`);
        await queryRunner.query('TRUNCATE products cascade');
        await queryRunner.query('TRUNCATE specializations cascade');
        await queryRunner.query('TRUNCATE positions cascade');

        await queryRunner.query(`INSERT INTO "blocking-reasons-groups" (id, name) VALUES ('9843c8d0-6b1d-4d42-b48f-185ee2bc7e97', 'График')`);
        await queryRunner.query(`INSERT INTO "blocking-reasons-groups" (id, name) VALUES ('ace69e5f-d8de-4db1-b7e7-5ab0009e8e4c', 'Компенсация')`);
        await queryRunner.query(`INSERT INTO "blocking-reasons-groups" (id, name) VALUES ('f76f8fe6-a872-491b-9e73-1e944272dea9', 'Формат')`);
        await queryRunner.query(`INSERT INTO "blocking-reasons-groups" (id, name) VALUES ('edc73e9c-dacd-453c-b76f-1faf10c191b1', 'Нарушения регламента')`);
        await queryRunner.query(`INSERT INTO "blocking-reasons-groups" (id, name) VALUES ('1450b462-a265-47df-baeb-2e44945ba5be', 'Нарушения условий контракта')`);
        await queryRunner.query(`INSERT INTO "blocking-reasons-groups" (id, name) VALUES ('92d40f95-d3fa-4f1e-a2e7-c8fe6509932f', 'Другое')`);

        await queryRunner.query(`INSERT INTO "blocking-reasons" (id, name, type, is_available_for_contractor, is_instant, is_recoverable, is_common_block, is_need_retraining, group_id) VALUES ('97b0f3fa-07d0-44eb-bdaa-5a278cdad56d', 'Не может совмещать с текущей работой', 'BLOCK', true, false, true, false, false, '9843c8d0-6b1d-4d42-b48f-185ee2bc7e97')`);
        await queryRunner.query(`INSERT INTO "blocking-reasons" (id, name, type, is_available_for_contractor, is_instant, is_recoverable, is_common_block, is_need_retraining, group_id) VALUES ('c712de78-6b91-4bcd-9eb4-60d50076d7f0', 'Не распределили на заказы', 'BLOCK', true, false, true, false, false, '9843c8d0-6b1d-4d42-b48f-185ee2bc7e97')`);
        await queryRunner.query(`INSERT INTO "blocking-reasons" (id, name, type, is_available_for_contractor, is_instant, is_recoverable, is_common_block, is_need_retraining, group_id) VALUES ('ba56c68b-a9c8-4651-921f-e36d04b4f55f', 'Отдых', 'FREEZE', true, false, true, true, false, '9843c8d0-6b1d-4d42-b48f-185ee2bc7e97')`);
        await queryRunner.query(`INSERT INTO "blocking-reasons" (id, name, type, is_available_for_contractor, is_instant, is_recoverable, is_common_block, is_need_retraining, group_id) VALUES ('f29d0fd8-c525-4449-9e09-abe41c03ca92', 'Семейные обстоятельства', 'FREEZE', true, false, true, true, false, '9843c8d0-6b1d-4d42-b48f-185ee2bc7e97')`);
        await queryRunner.query(`INSERT INTO "blocking-reasons" (id, name, type, is_available_for_contractor, is_instant, is_recoverable, is_common_block, is_need_retraining, group_id) VALUES ('1224b565-60ad-4b57-9e42-362d8f09ad58', 'Переезд', 'FREEZE', true, false, true, true, false, '9843c8d0-6b1d-4d42-b48f-185ee2bc7e97')`);
        await queryRunner.query(`INSERT INTO "blocking-reasons" (id, name, type, is_available_for_contractor, is_instant, is_recoverable, is_common_block, is_need_retraining, group_id) VALUES ('84dab237-b262-43b9-bdfa-f46abcabf74b', 'Отключение по неактивности', 'BLOCK', true, false, true, false, false, '9843c8d0-6b1d-4d42-b48f-185ee2bc7e97')`);

        await queryRunner.query(`INSERT INTO "blocking-reasons" (id, name, type, is_available_for_contractor, is_instant, is_recoverable, is_common_block, is_need_retraining, group_id) VALUES ('ce374cc2-1069-4daf-af3b-368b662ae9be', 'Наш(ел/ла) другую работу', 'BLOCK', true, false, true, true, false, 'ace69e5f-d8de-4db1-b7e7-5ab0009e8e4c')`);
        await queryRunner.query(`INSERT INTO "blocking-reasons" (id, name, type, is_available_for_contractor, is_instant, is_recoverable, is_common_block, is_need_retraining, group_id) VALUES ('a42f75f0-43f8-40d2-a3a1-e3b95dd1cc3e', 'Не оправдались ожидания по выплатам', 'BLOCK', true, false, true, false, false, 'ace69e5f-d8de-4db1-b7e7-5ab0009e8e4c')`);
        await queryRunner.query(`INSERT INTO "blocking-reasons" (id, name, type, is_available_for_contractor, is_instant, is_recoverable, is_common_block, is_need_retraining, group_id) VALUES ('531a48b9-e42b-4caa-9088-a7c8c8ed4612', 'Не устраивает период выплат', 'BLOCK', true, false, true, true, false, 'ace69e5f-d8de-4db1-b7e7-5ab0009e8e4c')`);

        await queryRunner.query(`INSERT INTO "blocking-reasons" (id, name, type, is_available_for_contractor, is_instant, is_recoverable, is_common_block, is_need_retraining, group_id) VALUES ('cb2d1848-9b6e-4780-aca1-a083e7ae6ca5', 'Не устраивает время в пути до заказа', 'BLOCK', true, false, true, false, false, 'f76f8fe6-a872-491b-9e73-1e944272dea9')`);
        await queryRunner.query(`INSERT INTO "blocking-reasons" (id, name, type, is_available_for_contractor, is_instant, is_recoverable, is_common_block, is_need_retraining, group_id) VALUES ('6c1d3ceb-513a-425a-a1e6-c6471f4e2572', 'Хочет изменить тариф', 'BLOCK', true, false, true, false, false, 'f76f8fe6-a872-491b-9e73-1e944272dea9')`);

        await queryRunner.query(`INSERT INTO "blocking-reasons" (id, name, type, is_available_for_contractor, is_instant, is_recoverable, is_common_block, is_need_retraining, group_id) VALUES ('cbfb0203-7343-4ecf-9249-3f6f7ee5064d', 'Низкое качество', 'BLOCK', false, false, true, false, true, 'edc73e9c-dacd-453c-b76f-1faf10c191b1')`);
        await queryRunner.query(`INSERT INTO "blocking-reasons" (id, name, type, is_available_for_contractor, is_instant, is_recoverable, is_common_block, is_need_retraining, group_id) VALUES ('6e023b9e-e4fc-4c44-853c-f0c132f89d99', 'Причинение ущерба', 'BLOCK', false, false, true, false, true, 'edc73e9c-dacd-453c-b76f-1faf10c191b1')`);
        await queryRunner.query(`INSERT INTO "blocking-reasons" (id, name, type, is_available_for_contractor, is_instant, is_recoverable, is_common_block, is_need_retraining, group_id) VALUES ('d0c2fb02-72ca-40f3-aa52-433862be5e97', 'Пунктуальность', 'BLOCK', false, false, true, false, true, 'edc73e9c-dacd-453c-b76f-1faf10c191b1')`);
        await queryRunner.query(`INSERT INTO "blocking-reasons" (id, name, type, is_available_for_contractor, is_instant, is_recoverable, is_common_block, is_need_retraining, group_id) VALUES ('03470bc7-6ce8-4791-bc92-e8bd6d51a289', 'Низкий клиентский рейтинг', 'BLOCK', false, false, true, true, true, 'edc73e9c-dacd-453c-b76f-1faf10c191b1')`);
        await queryRunner.query(`INSERT INTO "blocking-reasons" (id, name, type, is_available_for_contractor, is_instant, is_recoverable, is_common_block, is_need_retraining, group_id) VALUES ('237dba0b-ff10-462a-a797-1531c7a9ddec', 'Не прош(ел/а) испытательный срок', 'BLOCK', false, false, true, true, true, 'edc73e9c-dacd-453c-b76f-1faf10c191b1')`);

        await queryRunner.query(`INSERT INTO "blocking-reasons" (id, name, type, is_available_for_contractor, is_instant, is_recoverable, is_common_block, is_need_retraining, group_id) VALUES ('12f1e561-9d3f-49f7-9e0b-dda35d57c028', 'Противоправные действия', 'BLOCK', false, true, false, true, false, '1450b462-a265-47df-baeb-2e44945ba5be')`);
        await queryRunner.query(`INSERT INTO "blocking-reasons" (id, name, type, is_available_for_contractor, is_instant, is_recoverable, is_common_block, is_need_retraining, group_id) VALUES ('80677c58-2e89-43c9-a0c2-6a877bca27ea', 'Некорректное поведение', 'BLOCK', false, true, false, true, false, '1450b462-a265-47df-baeb-2e44945ba5be')`);
        await queryRunner.query(`INSERT INTO "blocking-reasons" (id, name, type, is_available_for_contractor, is_instant, is_recoverable, is_common_block, is_need_retraining, group_id) VALUES ('4fce052e-9d82-4fdc-8980-e2d8012f8dd3', 'Фрод', 'BLOCK', false, true, false, true, false, '1450b462-a265-47df-baeb-2e44945ba5be')`);
    
        await queryRunner.query(`INSERT INTO "blocking-reasons" (id, name, type, is_available_for_contractor, is_instant, is_recoverable, is_common_block, is_need_retraining, group_id) VALUES ('d27aefd5-d706-4d16-a71f-6c8b7239c77d', 'Проблемы со здоровьем', 'BLOCK', true, true, true, true, false, '92d40f95-d3fa-4f1e-a2e7-c8fe6509932f')`);

        await queryRunner.query(`INSERT INTO "products" (id, name, title) VALUES ('72b378c3-49f4-459e-a4d3-5ea1b0d014a0','podderzhivayushaya-uborka', 'Поддерживающая уборка')`);
        await queryRunner.query(`INSERT INTO "products" (id, name, title) VALUES ('f3200011-0deb-4beb-8c9b-a1038d57377f', 'okna', 'Окна')`);
        await queryRunner.query(`INSERT INTO "products" (id, name, title) VALUES ('b7935e23-fc25-4625-ba6f-0f64ae28010b', 'generalnaya-uborka', 'Генеральная уборка или уборка после ремонта')`);

        await queryRunner.query(`INSERT INTO "specializations" (id, name, title) VALUES ('81fd3713-1505-4ccd-ad36-cc722abb84fd', 'cleaner', 'Клинер')`);

        await queryRunner.query(`INSERT INTO "positions" (id, name, title) VALUES ('fa4e2e0c-3d44-4706-aad2-3ea78aa135b4', 'linejnyj', 'Линейный')`);
        await queryRunner.query(`INSERT INTO "positions" (id, name, title) VALUES ('149a8814-6d2d-4bac-ab84-58c3ee402f43', 'starshij', 'Старший')`);

        await queryRunner.query(`INSERT INTO "wages" (id, name, specialization_id, product_id, type ) VALUES ('fa34d310-28f0-4461-a818-0459a342ffd8', 'Тариф - Поддерживающая уборка', '81fd3713-1505-4ccd-ad36-cc722abb84fd', '72b378c3-49f4-459e-a4d3-5ea1b0d014a0', 'INDIVIDUAL')`);
        await queryRunner.query(`INSERT INTO "wages" (id, name, specialization_id, product_id, type ) VALUES ('17eae106-c2f4-471c-93a6-a1239bff09c9', 'Тариф - Окна', '81fd3713-1505-4ccd-ad36-cc722abb84fd', 'f3200011-0deb-4beb-8c9b-a1038d57377f', 'INDIVIDUAL')`);
        await queryRunner.query(`INSERT INTO "wages" (id, name, specialization_id, product_id, type ) VALUES ('ea612b48-44df-453f-a98c-d3ba52a4db4b', 'Тариф - Генеральная уборка или уборка после ремонта', '81fd3713-1505-4ccd-ad36-cc722abb84fd', '72b378c3-49f4-459e-a4d3-5ea1b0d014a0', 'INDIVIDUAL')`);

        await queryRunner.query(`INSERT INTO "grades" (id, position_id, wage_id, rate_amount, rate_type, rate_unit) VALUES ('5863efce-b3a1-4b40-8068-bc685075a38e', 'fa4e2e0c-3d44-4706-aad2-3ea78aa135b4', 'fa34d310-28f0-4461-a818-0459a342ffd8', 285, 'FIXED', 'HOUR')`);
        await queryRunner.query(`INSERT INTO "grades" (id, position_id, wage_id, rate_amount, rate_type, rate_unit) VALUES ('faabb5e8-8459-4bd3-a046-93accf5ed53a', 'fa4e2e0c-3d44-4706-aad2-3ea78aa135b4', '17eae106-c2f4-471c-93a6-a1239bff09c9', 285, 'FIXED', 'HOUR')`);
        await queryRunner.query(`INSERT INTO "grades" (id, position_id, wage_id, rate_amount, rate_type, rate_unit) VALUES ('b643b1cf-2fcc-42bf-bde5-4b64a2907443', 'fa4e2e0c-3d44-4706-aad2-3ea78aa135b4', 'ea612b48-44df-453f-a98c-d3ba52a4db4b', 250, 'FIXED', 'HOUR')`);
        await queryRunner.query(`INSERT INTO "grades" (id, position_id, wage_id, rate_amount, rate_type, rate_unit) VALUES ('b1ac2de9-20cb-40c2-b79d-9c5c422873cd', '149a8814-6d2d-4bac-ab84-58c3ee402f43', 'ea612b48-44df-453f-a98c-d3ba52a4db4b', 400, 'FIXED', 'HOUR')`);


        await queryRunner.query(`INSERT INTO public.skills (id,title,"name","option") VALUES ('028af73f-5f9e-452c-8e23-56bed85b9a10','Поддерживающая уборка','podderzhivayushaya-uborka','{"rooms","bathrooms","floor_cleaning","carpet_cleaning","clean_furniture","dust_cleaning","mirror_cleaning","bed_making","clothes_folding","trash_removal","disinfection","lustre","wardrobe","kitchen_sink_cleaning","wash_countertop","wash_stove","wash_dining_table","wash_dishese","refrigerator","microwave","oven","kitchen_cabinets","wash_bath_shower","bathroom_sink_cleaning","toilet_cleaning","bidet_cleaning","cat_litter_box","winter_windows","balcony_windows","windows","winter_balcony_windows","balconies","keys_delivery","keys_pickup","other_options"}')`);

        await queryRunner.query(`INSERT INTO public.skills (id,title,"name","option")VALUES ('c6d34644-b040-4cbb-a4ad-51f638c12f74', 'Глажка','Glazhka','{"ironing"}');`);
        await queryRunner.query(`INSERT INTO public.skills (id,title,"name","option")VALUES ('16f42fc1-047e-413b-8141-2208ae7e8da0', 'Дайсон уборка','dayson-uborka','{"vacuum_cleaner_dyson"}');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}