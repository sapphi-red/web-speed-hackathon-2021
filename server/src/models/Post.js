import Sequelize from 'sequelize';
import { ulid } from 'ulid';

import { sequelize } from '../sequelize.js';

/**
 * @typedef {object} PostAttributes
 * @property {string} id
 * @property {string} userId
 * @property {string} text
 * @property {number} favoriteCount
 */

/**
 * @typedef {import('sequelize').Model<PostAttributes>} PostModel
 */

/** @type {import('sequelize').ModelCtor<PostModel>} */
const Post = sequelize.define(
  'Post',
  {
    id: {
      type: Sequelize.DataTypes.STRING,
      defaultValue: () => ulid(),
      allowNull: false,
      primaryKey: true,
    },
    text: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['userId', 'movieId', 'soundId'],
      },
      include: [
        {
          association: 'user',
          attributes: { exclude: ['profileImageId'] },
          include: { association: 'profileImage' },
        },
        {
          association: 'images',
          through: { attributes: [] },
        },
        { association: 'movie' },
        { association: 'sound' },
      ],
    },
  },
);

export { Post };
