import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

export default defineConfig({
  connection: env.get('DB_CONNECTION', 'pg'),

  connections: {
    pg: {
      client: 'pg',
      connection: {
        host: env.get('PG_HOST', 'localhost'),
        port: env.get('PG_PORT') ? Number(env.get('PG_PORT')) : undefined,
        user: env.get('PG_USER'),
        password: env.get('PG_PASSWORD', ''),
        database: env.get('PG_DB_NAME'),
      },
      migrations: {
        naturalSort: true,
        paths : ['database/migrations'],
      },

    },
  },
})

