import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const PUBLIC_PATH = path.resolve(__dirname, '../../public');
const UPLOAD_PATH = path.resolve(__dirname, '../../upload');
const CLIENT_DIST_PATH = path.resolve(__dirname, '../../dist');
const DATABASE_PATH = path.resolve(__dirname, '../database.sqlite');

export { PUBLIC_PATH, CLIENT_DIST_PATH, DATABASE_PATH, UPLOAD_PATH };
