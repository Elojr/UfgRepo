import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        description: Sequelize.STRING,
        course: Sequelize.STRING,
        birthday: Sequelize.DATE,
        is_admin: Sequelize.BOOLEAN,
      },
      {
        hooks: {
          beforeSave: async user => {
            user.password_hash = await bcrypt.hash(user.password, 10);
          },
        },
        tableName: 'users',
        sequelize,
      }
    );
  }

  async validatePassword(password) {
    const isValid = await bcrypt.compare(password, this.password_hash);
    return isValid;
  }
}

export default User;
