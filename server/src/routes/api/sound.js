import fs from 'fs/promises';

import Router from 'express-promise-router';
import httpErrors from 'http-errors';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import audioDecode from 'audio-decode';

import { convertSound } from '../../converters/convert_sound.js';
import { UPLOAD_PATH } from '../../paths.js';

// 変換した音声の拡張子
const EXTENSION = 'mp3';

const router = Router();

const mean = nums => {
  let total = 0
  for (const n of nums) {
    total += n
  }
  return total / nums.length
}

const bimean = (arr1, arr2) => arr1.map((n, i) => (n + arr2[i]) / 2)

const chunk = (arr, chunkSize = 1, cache = []) => {
  if (chunkSize <= 0) return cache
  const max = Math.ceil(arr.length / chunkSize)
  for (let i = 0; i < max; i++) {
    cache.push(arr.subarray(i * chunkSize, (i+1) * chunkSize))
  }
  return cache
}

const getPeakRatiosFromAudioBuffer = buffer => {
  // 左の音声データの絶対値を取る
  const leftData = buffer.getChannelData(0).map(Math.abs);
  // 右の音声データの絶対値を取る
  const rightData = buffer.getChannelData(1).map(Math.abs);

  // 左右の音声データの平均を取る
  const normalized = bimean(leftData, rightData);
  // 100 個の chunk に分ける
  const chunks = chunk(normalized, Math.ceil(normalized.length / 100));
  // chunk ごとに平均を取る
  const peaks = chunks.map(mean);
  // chunk の平均の中から最大値を取る
  const max = Math.max(...peaks);
  const ratios = peaks.map(peak => peak / max)
  return ratios
}

const createSvgTextFromPeakRatios = ratios => {
  let text = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 1">'
  for (const [i, ratio] of ratios.entries()) {
    text += '<rect '+
      'fill="#2563EB" '+
      `height="${ratio}" `+
      'stroke="#EFF6FF" '+
      'stroke-width="0.01" '+
      'width="1" '+
      `x="${i}" `+
      `y="${1 - ratio}"`+
      '/>'
  }
  text += '</svg>'
  return text
}

export const createSvgTextFromBuffer = async buffer => {
  const audioBuffer = await audioDecode(buffer);
  const ratios = getPeakRatiosFromAudioBuffer(audioBuffer);
  return createSvgTextFromPeakRatios(ratios);
}

router.post('/sounds', async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized();
  }
  if (Buffer.isBuffer(req.body) === false) {
    throw new httpErrors.BadRequest();
  }

  const soundId = uuidv4();

  const converted = await convertSound(req.body, {
    extension: EXTENSION, // 動画の拡張子を指定する
  });

  const filePath = path.resolve(UPLOAD_PATH, `./sounds/${soundId}.${EXTENSION}`);
  await fs.writeFile(filePath, converted);

  const volumeSvgPath = path.resolve(UPLOAD_PATH, `./sounds/${soundId}.${EXTENSION}.meta.svg`);
  const svgText = await createSvgTextFromBuffer(converted.buffer);
  await fs.writeFile(volumeSvgPath, svgText, 'utf8');

  return res.status(200).type('application/json').send({ id: soundId });
});

export { router as soundRouter };
