import Sequelize from 'sequelize';

import User from '../app/models/User';
import Avatar from '../app/models/Avatar';

import sequelizeConfig from '../config/database';

const models = [User, Avatar];

class Database {
  constructor() {
    this.sequelize();
  }

  async sequelize() {
    this.connection = new Sequelize(sequelizeConfig);

    if (process.env.NODE_ENV === 'test') {
      this.connection.options.logging = false;
    }

    models.forEach(model => {
      model.init(this.connection);
    });
  }
}

export default new Database();
