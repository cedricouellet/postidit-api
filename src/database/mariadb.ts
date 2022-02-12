import { createPool, PoolConnection } from "mariadb";

import * as process from "process";

const pool = createPool({
  host: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 5,
  charset: "utf8mb4",
});

/**
 * Execute a query on the MariaDB database.
 * @param {string} sql The SQL query to execute.
 * @param {any[]} params The parameters to use in the query.
 *
 * Example:
 * ```
 * await query(
 * `SELECT * FROM table WHERE value1 = ? AND value2 = ?`,
 * [param1, param2]
 * );
 * ```
 */
async function query(sql: string, params: any[] = []) {
  let connection: PoolConnection | undefined;

  try {
    connection = await pool.getConnection();
    return await connection.query(sql, params);
  } catch (err) {
    throw err;
  } finally {
    if (connection) await connection.release();
  }
}

/**
 * Removes metadata from a query result.
 * @param {any} queryResult The object to remove metadata from.
 * @return {any} The object without metadata.
 */
function clean(queryResult: any) {
  delete queryResult?.meta;
  return queryResult;
}

export { clean, query };

export default query;
