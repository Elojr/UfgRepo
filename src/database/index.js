import Sequelize from 'sequelize';

import sequelizeConfig from '../config/database';

class Database {
  constructor() {
    this.sequelize();
  }

  async sequelize() {
    const connection = new Sequelize(sequelizeConfig);

    try {
      await connection.authenticate();
      console.log('Conexão estabelecida com o banco de dados.');
    } catch (err) {
      console.log('Erro ao estabelecer conexão com o banco de dados.', err);
    }
  }
}

export default new Database();
