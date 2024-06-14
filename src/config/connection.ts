import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const DB_USERNAME = process.env.DEV_DB_USERNAME as string
const DB_PASSWORD = process.env.DEV_DB_PASSWORD as string
const DB_DATABASE = process.env.DEV_DB_DATABASE as string

const sequelizeConnection = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: '127.0.0.1',
  dialect: 'postgres',
})

try {
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

export default sequelizeConnection
