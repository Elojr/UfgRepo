import Sequelize, { Model } from 'sequelize';

import User from './User';

class Avatar extends Model {
  static init(sequelize) {
    super.init(
      {
        filename: Sequelize.STRING,
        originalname: Sequelize.STRING,
        size: Sequelize.INTEGER,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            // This url will change if avatars are stored externally (AWS)
            return `${process.env.APP_URL}/public/avatars/${this.filename}`;
          },
        },
      },
      {
        tableName: 'avatars',
        sequelize,
      }
    );

    // Relationship with User model
    this.hasOne(User, { as: 'avatar', foreignKey: 'avatar_id' });
  }
}

export default Avatar;
