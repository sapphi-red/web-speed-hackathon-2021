import { authRouter } from './api/auth.js';
import { imageRouter } from './api/image.js';
import { movieRouter } from './api/movie.js';
import { postRouter } from './api/post.js';
import { soundRouter } from './api/sound.js';
import { userRouter } from './api/user.js';

const router = (fastify, opts, done) => {
  fastify.register(userRouter);
  fastify.register(postRouter);
  fastify.register(movieRouter);
  fastify.register(imageRouter);
  fastify.register(soundRouter);
  fastify.register(authRouter);

  done()
};

export { router as apiRouter };
