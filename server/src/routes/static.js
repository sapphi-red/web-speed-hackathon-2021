import fastifyStatic from 'fastify-static'

import { PUBLIC_PATH, CLIENT_DIST_PATH, UPLOAD_PATH } from '../paths.js';

const router = (fastify, opts, done) => {
  fastify.register(fastifyStatic, {
    root: [CLIENT_DIST_PATH, PUBLIC_PATH, UPLOAD_PATH],
    etag: true,
    lastModified: true,
    maxAge: 604800 * 1000,
    immutable: true,
    setHeaders: (res, path, _stat) => {
      if (path.endsWith('.html')) {
        // Custom Cache-Control for HTML files
        res.setHeader('Cache-Control', 'public, max-age=600')
      }
    }
  });

  // SPA 対応のため、ファイルが存在しないときに index.html を返す
  fastify.setNotFoundHandler(async (req, res) => {
    await res.sendFile('index.html', CLIENT_DIST_PATH)
  })

  done();
};

export { router as staticRouter };
