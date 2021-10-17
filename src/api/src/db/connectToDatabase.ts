import { MongoClient } from 'mongodb'

const uriDb = process.env.URL_DB
const client = new MongoClient(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

export default async function connectToDatabase() {
  if (client.isConnected) await client.connect()

  const db = client.db('db-bf')

  return { client, db }
}
