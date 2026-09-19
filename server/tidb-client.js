import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

let pool = null;

export function isTiDBConfigured() {
  const hasUrl = Boolean(process.env.DATABASE_URL || process.env.TIDB_DATABASE_URL);
  const hasCreds = Boolean(
    process.env.TIDB_HOST &&
    process.env.TIDB_USER &&
    (process.env.TIDB_PASSWORD !== undefined)
  );
  return hasUrl || hasCreds;
}

export function getTiDBPool() {
  if (pool) return pool;

  const url = process.env.DATABASE_URL || process.env.TIDB_DATABASE_URL;

  const sslConfig = process.env.TIDB_ENABLE_SSL === 'false' ? undefined : {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true,
  };

  if (url) {
    pool = mysql.createPool({
      uri: url,
      ssl: sslConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
    });
  } else if (isTiDBConfigured()) {
    pool = mysql.createPool({
      host: process.env.TIDB_HOST,
      port: Number(process.env.TIDB_PORT) || 4000,
      user: process.env.TIDB_USER,
      password: process.env.TIDB_PASSWORD || '',
      database: process.env.TIDB_DATABASE || 'test',
      ssl: sslConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
    });
  } else {
    return null;
  }

  return pool;
}

/**
 * Execute a parameterized query against TiDB
 * @param {string} sql 
 * @param {any[]} params 
 * @returns {Promise<any[]>}
 */
export async function query(sql, params = []) {
  const p = getTiDBPool();
  if (!p) {
    throw new Error('TiDB connection is not configured in .env (TIDB_HOST / TIDB_USER / TIDB_PASSWORD or DATABASE_URL).');
  }
  const [rows] = await p.execute(sql, params);
  return rows;
}

/**
 * Execute multiple queries inside an atomic transaction
 * @param {(conn: mysql.PoolConnection) => Promise<T>} callback 
 * @returns {Promise<T>}
 */
export async function transaction(callback) {
  const p = getTiDBPool();
  if (!p) {
    throw new Error('TiDB connection is not configured in .env.');
  }
  const conn = await p.getConnection();
  try {
    await conn.beginTransaction();
    const result = await callback(conn);
    await conn.commit();
    return result;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

export default {
  getTiDBPool,
  isTiDBConfigured,
  query,
  transaction,
};
