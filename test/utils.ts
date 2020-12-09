import { Connection } from 'typeorm';

export async function cleanup(conn: Connection) {
  await conn.query(`TRUNCATE ${process.env.TYPEORM_SCHEMA}.products CASCADE`);
  await conn.query(`TRUNCATE ${process.env.TYPEORM_SCHEMA}.grades CASCADE`);
  await conn.query(`TRUNCATE ${process.env.TYPEORM_SCHEMA}.contracts CASCADE`);
  await conn.query(`TRUNCATE ${process.env.TYPEORM_SCHEMA}.compensations CASCADE`);

  await conn.query(`TRUNCATE ${process.env.TYPEORM_SCHEMA}.wages CASCADE`);
  await conn.query(`TRUNCATE ${process.env.TYPEORM_SCHEMA}.positions CASCADE`);
  await conn.query(`TRUNCATE ${process.env.TYPEORM_SCHEMA}.specializations CASCADE`);
}
