const db = require("../database/dbconfig");

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db("users").select("*");
}

function findById(id) {
  return db("users")
    .select("*")
    .where({ id });
}

function add(users) {
  return db("users")
    .insert(users, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function update(id, change) {
  return db("users")
    .select("*")
    .where({ id })
    .update(change);
}

function remove(id) {
  return db("users")
    .select("*")
    .where({ id })
    .del();
}
