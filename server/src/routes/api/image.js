import fs from 'fs/promises';

import Router from 'express-promise-router';
import httpErrors from 'http-errors';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { convertImage } from '../../converters/convert_image.js';
import { UPLOAD_PATH } from '../../paths.js';

// 変換した画像の拡張子
const EXTENSION = 'webp';

const router = Router();

router.post('/images', async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized();
  }
  if (Buffer.isBuffer(req.body) === false) {
    throw new httpErrors.BadRequest();
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

  return res.status(200).type('application/json').send({ id: imageId });
});

export { router as imageRouter };
