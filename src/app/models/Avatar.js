import Sequelize, { Model } from 'sequelize';

import User from './User';

class Avatar extends Model {
  static init(sequelize) {
    super.init(
      {
        file_name: Sequelize.STRING,
        original_name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            // This url will change if avatars are stored externally (AWS)
            return `${process.env.APP_URL}/public/${this.path}`;
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
