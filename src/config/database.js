require('dotenv/config');

const nodeEnv = process.env.NODE_ENV;

module.exports = {
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  dialect: nodeEnv === 'test' ? 'sqlite' : 'postgres',
  storage: './__tests__/storage.sqlite',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  database: process.env.DATABASE_NAME,
};
