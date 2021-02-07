import fs from 'fs/promises';

import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { apiMiddleware } from '../apiMiddleware.js'
import { convertMovie } from '../../converters/convert_movie.js';
import { UPLOAD_PATH } from '../../paths.js';

// 変換した動画の拡張子
const EXTENSION = 'webm';

const router = (fastify, opts, done) => {
  fastify.post('/movies', apiMiddleware(async (req, res) => {
    if (req.session.userId === undefined) {
      throw fastify.httpErrors.unauthorized();
    }
    if (Buffer.isBuffer(req.body) === false) {
      throw fastify.httpErrors.badRequest();
    }

    const movieId = uuidv4();

    const converted = await convertMovie(req.body, {
      size: undefined, // 動画の縦横サイズを指定する (undefined は元動画に合わせる)
      extension: EXTENSION, // 動画の拡張子を指定する
    });

    const filePath = path.resolve(UPLOAD_PATH, `./movies/${movieId}.${EXTENSION}`);
    await fs.writeFile(filePath, converted);

    res.header('Cache-Control', 'no-cache');
    return { id: movieId };
  }));

  done()
};

export { router as movieRouter };
