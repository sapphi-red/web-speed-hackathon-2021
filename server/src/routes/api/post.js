import { apiMiddleware } from '../apiMiddleware.js'
import { Post, Comment } from '../../models/index.js';

const router = (fastify, opts, done) => {
  fastify.get('/posts', apiMiddleware(async (req, res) => {
    const posts = await Post.findAll({
      limit: req.query.limit,
      offset: req.query.offset,
      order: [['id', 'DESC']],
    });

    res.header('Cache-Control', 'no-cache');
    return posts;
  }));

  fastify.get('/posts/:id', apiMiddleware(async (req, res) => {
    const post = await Post.findByPk(req.params.id);

    if (post === null) {
      throw fastify.httpErrors.notFound();
    }

    res.header('Cache-Control', 'no-cache');
    return post;
  }));

  fastify.get('/posts/:id/comments', apiMiddleware(async (req, res) => {
    const posts = await Comment.findAll({
      where: {
        postId: req.params.id,
      },
      limit: req.query.limit,
      offset: req.query.offset,
      order: [['id', 'DESC']],
    });

    res.header('Cache-Control', 'no-cache');
    return posts;
  }));

  fastify.post('/posts', apiMiddleware(async (req, res) => {
    if (req.session.userId === undefined) {
      throw fastify.httpErrors.unauthorized();
    }

    const post = await Post.create(
      {
        ...req.body,
        userId: req.session.userId,
      },
      {
        include: [
          {
            association: 'images',
            through: { attributes: [] },
          },
          { association: 'movie' },
          { association: 'sound' },
        ],
      },
    );

    res.header('Cache-Control', 'no-cache');
    return post;
  }));

  done()
};

export { router as postRouter };
