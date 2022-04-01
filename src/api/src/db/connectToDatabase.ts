import { MongoClient } from 'mongodb'

const urlDb = process.env.URL_DB
const client = new MongoClient(urlDb)
let cashedClient: MongoClient

export default async function connectToDatabase() {
  try {
    if (!cashedClient) {
      cashedClient = await client.connect()
      console.log('Connected successful')
    }
  } catch {
    throw new Error('Connected unsuccess')
  }

  const db = cashedClient.db('db-bf')

  return { db }
}

if (!urlDb) throw new Error(`No access to url. url : ${urlDb}`)

process.addListener('SIGINT', () => {
  try {
    cashedClient.close()
    console.log('Connection is closed.')
  } catch (error) {
    console.log(error)
  }
})
