import Sequelize from 'sequelize';

import { sequelize } from '../sequelize.js';

/**
 * @typedef {object} ImageAttributes
 * @property {string} id
 * @property {string} alt
 */

/**
 * @typedef {import('sequelize').Model<ImageAttributes>} ImageModel
 */

/** @type {import('sequelize').ModelCtor<ImageModel>} */
const Image = sequelize.define('Image', {
  id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  alt: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
});

export { Image };
