require('../bootstrap');

/* observe que na prop storage usamos './' pq essa prop inicia a busca na raíz
do projeto, e nao na pasta em q nos encontramos.
o banco de dados sqlite passado na prop storage vai ser usado apenas no amb de testes.
Mas para saber qual arquivo env carregar (.env para desenvolvimento ou .env.test
para testes) devemos alterar algumas coisas no src/app.js */

module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  storage: './__tests__/database.sqlite',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
