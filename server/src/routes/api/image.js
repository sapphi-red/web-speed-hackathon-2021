import fs from 'fs/promises';

import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { apiMiddleware } from '../apiMiddleware.js'
import { convertImage } from '../../converters/convert_image.js';
import { UPLOAD_PATH } from '../../paths.js';

// 変換した画像の拡張子
const EXTENSION = 'webp';

const router = (fastify, opts, done) => {
  fastify.post('/images', apiMiddleware(async (req, res) => {
    if (req.session.userId === undefined) {
      throw fastify.httpErrors.unauthorized();
    }
    if (Buffer.isBuffer(req.body) === false) {
      throw fastify.httpErrors.badRequest();
    }

    const imageId = uuidv4();

    const converted = await convertImage(req.body, {
      width: 640, // 画像の縦横サイズを指定する
      height: undefined,
      extension: EXTENSION, // 画像の拡張子を指定する
    });

    const filePath = path.resolve(UPLOAD_PATH, `./images/${imageId}.${EXTENSION}`);
    await fs.writeFile(filePath, converted);

    const converted2 = await convertImage(req.body, {
      width: 320, // 画像の縦横サイズを指定する
      height: undefined,
      extension: EXTENSION, // 画像の拡張子を指定する
    });
    const filePath2 = path.resolve(UPLOAD_PATH, `./images/${imageId}-2.${EXTENSION}`);
    await fs.writeFile(filePath2, converted2);

    res.header('Cache-Control', 'no-cache');
    return { id: imageId };
  }));

  done()
};

export { router as imageRouter };
