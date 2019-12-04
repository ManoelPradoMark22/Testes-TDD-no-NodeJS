import database from '../../src/database'; /* p/ pegar o connection do index.js */

export default function truncate() {
  // Promisse.all pq vai retornar todas as promisses
  return Promise.all(
    Object.keys(database.connection.models).map(key => {
      return database.connection.models[key].destroy({
        truncate: true, // usar o truncate no lugar do delete do sql
        force: true, // força a remocao
      });
    })
  );
}

/* agora se chamarmos o await truncate, ela vai limpar todos os dados da database
de testes! */
