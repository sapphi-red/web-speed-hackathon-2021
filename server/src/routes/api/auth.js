import { apiMiddleware } from '../apiMiddleware.js'
import { User } from '../../models/index.js';

const router = (fastify, opts, done) => {
  fastify.post('/signup', apiMiddleware(async (req, res) => {
    const { id: userId } = await User.create(req.body);

    const user = await User.findByPk(userId);

    req.session.userId = user.id;

    res.header('Cache-Control', 'no-cache');
    return user;
  }));

  fastify.post('/signin', apiMiddleware(async (req, res) => {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (user === null) {
      throw fastify.httpErrors.badRequest();
    }
    if (user.validPassword(req.body.password) === false) {
      throw fastify.httpErrors.badRequest();
    }

    req.session.userId = user.id;

    res.header('Cache-Control', 'no-cache');
    return user;
  }));

  fastify.post('/signout', apiMiddleware(async (req, res) => {
    req.session.userId = undefined;

    res.header('Cache-Control', 'no-cache');
    return {};
  }));

  done()
};

export { router as authRouter };
