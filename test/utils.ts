import { Connection } from 'typeorm';

export async function cleanup(conn: Connection) {
  await conn.query(`TRUNCATE ${process.env.TYPEORM_SCHEMA}.products CASCADE`);
  await conn.query(`TRUNCATE ${process.env.TYPEORM_SCHEMA}.grades CASCADE`);
  await conn.query(`TRUNCATE ${process.env.TYPEORM_SCHEMA}.contracts CASCADE`);
  await conn.query(`TRUNCATE ${process.env.TYPEORM_SCHEMA}.compensations CASCADE`);
  await conn.query(`TRUNCATE ${process.env.TYPEORM_SCHEMA}.contractors CASCADE`);

  await conn.query(`TRUNCATE ${process.env.TYPEORM_SCHEMA}."blocking-reasons" CASCADE`);

  await conn.query(`TRUNCATE ${process.env.TYPEORM_SCHEMA}.wages CASCADE`);
  await conn.query(`TRUNCATE ${process.env.TYPEORM_SCHEMA}.skills CASCADE`);
  await conn.query(`TRUNCATE ${process.env.TYPEORM_SCHEMA}."contracts_skills" CASCADE`);

  await conn.query(`TRUNCATE ${process.env.TYPEORM_SCHEMA}.positions CASCADE`);
  await conn.query(`TRUNCATE ${process.env.TYPEORM_SCHEMA}.specializations CASCADE`);

  await conn.query(`TRUNCATE ${process.env.TYPEORM_SCHEMA}."blocking-reasons" CASCADE`);
  await conn.query(`TRUNCATE ${process.env.TYPEORM_SCHEMA}."blocking-reasons-groups" CASCADE`);

}
