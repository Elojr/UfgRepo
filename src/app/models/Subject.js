import Sequelize, { Model } from 'sequelize';

class Subject extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        institute: Sequelize.STRING,
      },
      {
        tableName: 'subjects',
        sequelize,
      }
    );
  }
}

export default Subject;
