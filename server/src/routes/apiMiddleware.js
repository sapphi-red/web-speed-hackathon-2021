import Sequelize from 'sequelize';

const apiMiddleware = handler => async (req, reply) => {
  try {
    const res = await handler(req, reply)

    return res
  } catch (e) {
    if (e instanceof Sequelize.ValidationError) {
      throw fastify.httpErrors.badRequest();
    }
    if (!('status' in e) || e.status === 500) {
      console.error(e);
    }
    reply.code(e.status || 500)
    return { message: e.message }
  }
}

export { apiMiddleware }
