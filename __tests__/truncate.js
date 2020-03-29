import database from '../src/database';

export default function truncate() {
  const { models } = database.connection;

  return Promise.all(
    Object.keys(models).map(key => {
      return models[key].destroy({
        where: {},
        force: true,
      });
    })
  );
}
