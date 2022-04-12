import { MongoClient } from 'mongodb'
import { memoDb } from '../../../helpers'

const urlDb = process.env.URL_DB

if (!urlDb) throw new Error(`No access to url. url : ${urlDb}`)

async function connection() {
  const client = new MongoClient(urlDb)
  let mongoClient: MongoClient = null

  try {
    if (!mongoClient) {
      mongoClient = await client.connect()
      console.log('Connected successful')
    }
  } catch {
    throw new Error('Connected unsuccess')
  }

  const db = mongoClient.db('db-bf')

  return { db }
}

const connectToDatabase = async () => memoDb(connection)

export default connectToDatabase
