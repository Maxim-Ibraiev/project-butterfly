import mongoose, { Model } from 'mongoose'
import categoriesSchema from './schemas/categoriesSchemas'
import productSchema from './schemas/productsSchemas'

const uriDb = process.env.URL_DB

// check the MongoDB URI
if (!uriDb) throw new Error('Define the mongoose environmental variable')
mongoose.connection.on('error', err => new Error(`Mongoose error: ${err.message}`))

type T = { [key: string]: string }
type Db = typeof cachedDb | null
interface Models {
  [key: string]: Model<typeof categoriesSchema | typeof productSchema, T[]>
}
interface IConnectToDatabase {
  db: Db
  models: Models
}

let cachedDb = null
let models = null

async function connectToDatabase(): Promise<IConnectToDatabase> {
  // check the cached.
  if (cachedDb && models) {
    return { db: cachedDb, models }
  }

  const db = await getDb()
  const categories = db.models.categories || mongoose.model('categories', categoriesSchema)
  const products = db.models.products || mongoose.model('products', productSchema)

  // set cache
  cachedDb = db
  models = {
    categories,
    products,
  }

  return { db: cachedDb, models }
}

async function getDb() {
  // Connect to cluster
  const connectToDB = async () =>
    mongoose.connect(uriDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      poolSize: 5,
    })

  let db: typeof mongoose = null

  try {
    db = await connectToDB()
    console.log('Database connection successful')
  } catch (error) {
    throw new Error(`Mongoose error: ${error.message}`)
  }

  return db
}

process.on('SIGINT', async () => {
  mongoose.connection.close(() => {
    console.log('Connection to BD closed and app termination')
    process.exit(1)
  })
})

// eslint-disable-next-line no-return-await

export default connectToDatabase
