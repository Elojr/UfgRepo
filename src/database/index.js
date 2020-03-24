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

    try {
      await this.connection.authenticate();
      console.log('Conexão estabelecida com o banco de dados.');
    } catch (err) {
      console.log('Erro ao estabelecer conexão com o banco de dados.', err);
    }

    models.forEach(model => {
      model.init(this.connection);
    });
  }
}

export default new Database();
