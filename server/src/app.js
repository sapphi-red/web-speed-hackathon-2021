import fastify from 'fastify';
import fastifySession from 'fastify-session';
import fastifyCookie from 'fastify-cookie';
import fastifySensible from 'fastify-sensible';

import { apiRouter } from './routes/api.js';
import { staticRouter } from './routes/static.js';

const app = fastify({
  logger: false,
  trustProxy: true,
})
app.register(fastifyCookie);
app.register(fastifySession, {
  cookieName: 'wshsid',
  cookie: { secure: false },
  secret: 'secretsecretsecretsecretsecretsecret',
  saveUninitialized: false,
})
app.register(fastifySensible);

app.addContentTypeParser(
  ['application/octet-stream'],
  {
    bodyLimit: 1048576 * 10, // 10mb
  },
  function (request, payload, next) {
    let dataBody = [];
    payload.on('data', (chunk) => {
      dataBody.push(chunk)
    });

    payload.on('end', () => next(null, Buffer.concat(dataBody)));
  }
);

app.register(apiRouter, { prefix: '/api/v1' })
app.register(staticRouter)

export { app };
