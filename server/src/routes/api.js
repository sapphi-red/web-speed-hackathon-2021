import Router from 'express-promise-router';
import httpErrors from 'http-errors';
import Sequelize from 'sequelize';

import { authRouter } from './api/auth.js';
import { imageRouter } from './api/image.js';
import { movieRouter } from './api/movie.js';
import { postRouter } from './api/post.js';
import { soundRouter } from './api/sound.js';
import { userRouter } from './api/user.js';

const router = Router();

router.use((_req, res, next) => {
  res.header({
    'Cache-Control': 'no-cache',
  });
  return next();
});

router.use(userRouter);
router.use(postRouter);
router.use(movieRouter);
router.use(imageRouter);
router.use(soundRouter);
router.use(authRouter);

router.use(async (err, _req, _res, _next) => {
  if (err instanceof Sequelize.ValidationError) {
    throw new httpErrors.BadRequest();
  }
  throw err;
});

router.use(async (err, _req, res, _next) => {
  if (!'status ' in err || err.status === 500) {
    console.error(err);
  }

  return res
    .status(err.status || 500)
    .type('application/json')
    .send({
      message: err.message,
    });
});

export { router as apiRouter };
