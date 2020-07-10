import http from 'http'
import Koa from 'koa'
import cors from '@koa/cors'
import respond from 'koa-respond'
import koaBody from 'koa-body'

import config from '@config'

import logger from '@logger'
import notFoundHandler from '@middleware/not-found'
import requestLogger from '@middleware/request-logger'
import chalk from 'chalk'

import { db } from '@db/connect'

import router from '@routes'

type DestroyFunctionType = () => any
interface ServerWithDestroy extends http.Server {
  destroy?: DestroyFunctionType
}
function enableDestroy(server): void {
  const connections = {}

  server.on('connection', function (conn) {
    const key = `${conn.remoteAddress}:${conn.remotePort}`
    connections[key] = conn
    conn.on('close', function () {
      delete connections[key]
    })
  })

  server.destroy = function (cb) {
    server.close(cb)
    for (const key in connections) {
      if (connections[key]) connections[key].destroy()
    }
  }
}

async function createAPIServer() {
  logger.api.info('Creating server...')

  const app = new Koa()

  app
    .use(requestLogger('API', chalk.magenta))
    // Adds ctx.ok(), ctx.notFound(), etc..
    .use(
      respond({
        statusMethods: {
          conflict: 409,
        },
      })
    )
    .use(cors({ origin: config.get('client.domain'), credentials: true }))
    .use(koaBody({ multipart: true, parsedMethods: ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE'] }))
    // Load routes
    .use(router.routes())
    .use(router.allowedMethods())
    // Default handler when nothing stopped the chain.
    .use(notFoundHandler)

  app.proxy = true

  const server: ServerWithDestroy = http.createServer(app.callback())

  enableDestroy(server)

  server.on('close', () => {
    db.close()
    server.destroy()
    logger.api.info('Server closing, bye!')
  })

  logger.api.info('Server created, ready to listen')
  return server
}

export { createAPIServer, enableDestroy }
