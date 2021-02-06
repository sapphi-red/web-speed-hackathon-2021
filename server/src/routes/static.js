import history from 'connect-history-api-fallback';
import Router from 'express-promise-router';
import serveStatic from 'serve-static';

import { PUBLIC_PATH, CLIENT_DIST_PATH, UPLOAD_PATH } from '../paths.js';

const router = Router();

// SPA 対応のため、ファイルが存在しないときに index.html を返す
router.use(history());

router.use(
  serveStatic(UPLOAD_PATH, {
    etag: true,
    lastModified: true,
  }),
);

router.use(
  serveStatic(PUBLIC_PATH, {
    etag: true,
    lastModified: true,
  }),
);

router.use(
  serveStatic(CLIENT_DIST_PATH, {
    etag: true,
    lastModified: true,
  }),
);

export { router as staticRouter };
