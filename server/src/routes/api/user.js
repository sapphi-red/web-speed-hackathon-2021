import { apiMiddleware } from '../apiMiddleware.js'
import { User, Post } from '../../models/index.js';

const router = (fastify, opts, done) => {
  fastify.get('/me', apiMiddleware(async (req, res) => {
    if (req.session.userId === undefined) {
      throw fastify.httpErrors.unauthorized();
    }
    const user = await User.findByPk(req.session.userId);

    if (user === null) {
      throw fastify.httpErrors.notFound();
    }

    res.header('Cache-Control', 'no-cache');
    return user;
  }));

  fastify.put('/me', apiMiddleware(async (req, res) => {
    if (req.session.userId === undefined) {
      throw fastify.httpErrors.unauthorized();
    }
    const user = await User.findByPk(req.session.userId);

    if (user === null) {
      throw fastify.httpErrors.notFound();
    }

    Object.assign(user, req.body);
    await user.save();

    res.header('Cache-Control', 'no-cache');
    return user;
  }));

  fastify.get('/users/:username', apiMiddleware(async (req, res) => {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
    });

    if (user === null) {
      throw fastify.httpErrors.notFound();
    }

    res.header('Cache-Control', 'no-cache');
    return user;
  }));

  fastify.get('/users/:username/posts', apiMiddleware(async (req, res) => {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
    });

    if (user === null) {
      throw fastify.httpErrors.notFound();
    }

    const posts = await Post.findAll({
      where: {
        userId: user.id,
      },
      limit: req.query.limit,
      offset: req.query.offset,
      order: [['id', 'DESC']],
    });

    res.header('Cache-Control', 'no-cache');
    return posts;
  }));

  done()
};

export { router as userRouter };
