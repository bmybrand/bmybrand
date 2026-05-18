import mysql from 'mysql2/promise'

let pool: mysql.Pool | null = null

export function getMysqlPool() {
  if (pool) return pool

  const host = process.env.MYSQL_HOST
  const user = process.env.MYSQL_USER
  const password = process.env.MYSQL_PASSWORD
  const database = process.env.MYSQL_DATABASE

  if (!host || !user || !database) {
    throw new Error(
      'MySQL is not configured. Set MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, and MYSQL_DATABASE in .env.local'
    )
  }

  pool = mysql.createPool({
    host,
    user,
    password: password ?? '',
    database,
    port: Number(process.env.MYSQL_PORT || 3306),
    waitForConnections: true,
    connectionLimit: 10,
  })

  return pool
}
