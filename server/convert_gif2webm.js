import fs from 'fs/promises'
import path from 'path'
import { fetchFile } from '@ffmpeg/ffmpeg'
import { PUBLIC_PATH } from './src/paths.js'
import { ffmpeg } from './src/ffmpeg.js'

const dir = path.resolve(PUBLIC_PATH, './movies')

await ffmpeg.load();

const files = await fs.readdir(dir)
for (const file of files) {
  if (path.extname(file) !== '.gif') continue
  if (file.includes('090e7491-5cdb-4a1b-88b1-1e036a45e296')) continue

  const newFile = `${path.basename(file, '.gif')}.webm`

  const buf = await fetchFile(path.resolve(dir, file))
  ffmpeg.FS('writeFile', 'file', buf)
  await ffmpeg.run('-i', 'file', '-movflags', 'faststart', '-pix_fmt', 'yuv420p', newFile)
  const exported = ffmpeg.FS('readFile', newFile)
  await fs.writeFile(path.resolve(dir, `./${newFile}`), exported, 'binary')
  console.log(`outputed: ${newFile}`)
}
