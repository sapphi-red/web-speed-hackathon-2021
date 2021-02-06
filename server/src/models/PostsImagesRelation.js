import Sequelize from 'sequelize';

import { sequelize } from '../sequelize.js';

import { Image } from './Image.js';
import { Post } from './Post.js';

const PostsImagesRelation = sequelize.define('PostsImagesRelation', {
  postId: {
    type: Sequelize.DataTypes.STRING,
    references: {
      model: Post,
    },
  },
  imageId: {
    type: Sequelize.DataTypes.STRING,
    references: {
      model: Image,
    },
  },
});

export { PostsImagesRelation };
