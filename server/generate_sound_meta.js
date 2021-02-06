import fs from 'fs/promises'
import path from 'path'
import { PUBLIC_PATH } from './src/paths.js'
import { createSvgTextFromBuffer } from './src/routes/api/sound.js'

const dir = path.resolve(PUBLIC_PATH, './sounds')

const files = await fs.readdir(dir)

for (const file of files) {
  if (path.extname(file) !== '.mp3') continue

  const metaFile = `${file}.meta.svg`;

  const buffer = await fs.readFile(path.resolve(dir, file));
  const svgText = await createSvgTextFromBuffer(buffer);
  await fs.writeFile(path.resolve(dir, metaFile), svgText, 'utf8');

  console.log(`outputed: ${metaFile}`)
}
