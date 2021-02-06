import Sequelize from 'sequelize';

import { sequelize } from '../sequelize.js';

/**
 * @typedef {object} MovieAttributes
 * @property {string} id
 */

/**
 * @typedef {import('sequelize').Model<MovieAttributes>} MovieModel
 */

/** @type {import('sequelize').ModelCtor<MovieModel>} */
const Movie = sequelize.define('Movie', {
  id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
});

export { Movie };
