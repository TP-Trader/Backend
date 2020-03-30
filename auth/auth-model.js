const db = require('../database/dbConfig');

module.exports = {
  add,
  findBy,
  findById
}

function add(user) {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}  
function findBy(username) {
  return db('users')
    .select('*')
    .where({ username });
}

function findById(id) {
  return db('users')
  .select('*')
  .where({ id })
}

