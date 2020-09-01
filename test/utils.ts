import { Connection } from 'typeorm';

export async function cleanup(conn: Connection) {
  await conn.query(`DELETE FROM ${process.env.TYPEORM_SCHEMA}.executor`);
  await conn.query(`DELETE FROM ${process.env.TYPEORM_SCHEMA}.tariff`);
  await conn.query(`DELETE FROM ${process.env.TYPEORM_SCHEMA}.citizenship`);
  await conn.query(`DELETE FROM ${process.env.TYPEORM_SCHEMA}.spezialization`);
}
