import { Connection } from 'typeorm';

export async function cleanup(conn: Connection) {
  await conn.query(`DELETE FROM ${process.env.TYPEORM_SCHEMA}.bookable_person`);
  await conn.query(`DELETE FROM ${process.env.TYPEORM_SCHEMA}.busy_interval`);
  await conn.query(`DELETE FROM ${process.env.TYPEORM_SCHEMA}.working_day_interval`);
}
