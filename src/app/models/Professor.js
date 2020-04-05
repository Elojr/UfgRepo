import Sequelize, { Model } from 'sequelize';

class Professors extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        institute: Sequelize.STRING,
        email: Sequelize.STRING,
        description: Sequelize.STRING,
      },
      {
        tableName: Professors,
        sequelize,
      }
    );
  }
}

export default Professors;
