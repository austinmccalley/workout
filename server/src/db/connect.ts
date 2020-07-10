import logger from '@logger'
import config from '@config'

import chalk from 'chalk'
import mongoose from 'mongoose'

import ConnectionString from './connection-string-builder'

mongoose.set('runValidators', true) // run validators on update

let db

export default async function connectToMongo() {
  const mongoConfig = config.get('mongo')

  if (mongoose.connection.readyState === 1) {
    return mongoose
  }
  logger.db.info(`Connecting to Mongo ${mongoConfig.host}...`)

  try {
    if (!mongoConfig.auth.enabled && config.get('env') === 'production')
      throw new Error('Mongo Authentication must be enabled in production')
    const connectionString = new ConnectionString({
      username: mongoConfig.auth.enabled ? mongoConfig.auth.username : undefined,
      password: mongoConfig.auth.enabled ? mongoConfig.auth.password : undefined,
      database: mongoConfig.name,
      hosts: [{ host: mongoConfig.host, port: mongoConfig.port }],
    })

    db = await mongoose.connect(connectionString.toURI(), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    })

    logger.db.info('Successfully connected to Mongo')
  } catch (err) {
    logger.db.error('Could not connect to MongoDB!')
    logger.db.error(err.message)
    throw new Error('Could not connect to MongoDB')
  }

  mongoose.set('debug', config.get('env') === 'development')

  mongoose.connection.on('error', function mongoConnectionError(err) {
    if (err.message.code === 'ETIMEDOUT') {
      logger.warn('Mongo connection timeout!', err)
      setTimeout(() => {
        mongoose.connect(config.db.uri, config.db.options)
      }, 1000)
      return
    }

    logger.db.error('Could not connect to MongoDB!')
    logger.db.error(err.message)
  })

  mongoose.connection.once('open', function mongoAfterOpen() {
    logger.db.info(chalk.yellow.bold('Mongo DB connected.'))
    logger.db.info('')
    if (config.env !== 'production') {
      // TODO: Implement seeding database
    }
  })

  return db
}

export { db }
