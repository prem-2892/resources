// db configuration here
const mongoose = require('mongoose')
const { Pool } = require('pg')
const { PrismaClient } = require('@prisma/client')
const mysql = require('mysql2/promise') // MySQL
const redis = require('redis') // Redis

// MongoDB Connection (Mongoose)
// To get MongoDB URI:
// - If using MongoDB Atlas (cloud), go to your cluster, click "Connect", and follow the instructions to get your URI.
// - Example: mongodb://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB connected')
  } catch (error) {
    console.error('Error connecting to MongoDB', error)
    process.exit(1)
  }
}

// PostgreSQL Connection (pg)
// To get PostgreSQL URI:
// - If hosted locally, the URI will be something like: postgresql://username:password@localhost:5432/database
// - If using a cloud service like AWS RDS or Heroku, you can find the connection URL in the database dashboard.
const connectPostgres = async () => {
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URI,
  })

  try {
    await pool.connect()
    console.log('PostgreSQL connected')
  } catch (error) {
    console.error('Error connecting to PostgreSQL', error)
    process.exit(1)
  }
}

// Prisma Connection
// Prisma needs a connection string (Postgres, MySQL, etc.)
// - Configure the database URL in your .env file. For example:
// - POSTGRES_URI=postgresql://username:password@host:port/database?schema=public
const prisma = new PrismaClient()
const connectPrisma = async () => {
  try {
    await prisma.$connect()
    console.log('Prisma connected')
  } catch (error) {
    console.error('Error connecting to Prisma', error)
    process.exit(1)
  }
}

// MySQL Connection (mysql2)
// To get MySQL details:
// - If hosted locally, use: host (localhost), user (root or other), password (your chosen password).
// - If using cloud services like AWS RDS or Google Cloud SQL, you can get host, user, password, and database name from the dashboard.
const connectMySQL = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST, // E.g., 'localhost' or cloud host address
      user: process.env.MYSQL_USER, // E.g., 'root'
      password: process.env.MYSQL_PASSWORD, // Your password
      database: process.env.MYSQL_DB, // Database name
    })
    console.log('MySQL connected')
  } catch (error) {
    console.error('Error connecting to MySQL', error)
    process.exit(1)
  }
}

// Redis Connection (redis)
// To get Redis details:
// - If hosted locally, you can connect with default settings (localhost:6379).
// - If using Redis Cloud, the connection string can be found in the dashboard.
const connectRedis = async () => {
  const client = redis.createClient({
    url: process.env.REDIS_URL, // E.g., redis://localhost:6379
  })

  client.on('error', (err) => {
    console.error('Error connecting to Redis', err)
    process.exit(1)
  })

  client.on('connect', () => {
    console.log('Redis connected')
  })

  await client.connect()
}

module.exports = {
  connectMongoDB,
  connectPostgres,
  connectPrisma,
  connectMySQL,
  connectRedis,
}
