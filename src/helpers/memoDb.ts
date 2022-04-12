/* eslint-disable no-underscore-dangle */
import { Db } from 'mongodb'

export default async function memoDb(
  connection: () => Promise<{
    db: Db
  }>
) {
  if (!global._mongoDb) {
    global._mongoDb = (await connection()).db
  }

  return { db: global._mongoDb }
}
