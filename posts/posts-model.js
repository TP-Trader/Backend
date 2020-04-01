const db = require("../database/dbconfig");

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db("posts").select("*");
}

function findById(id) {
  return db("posts")
    .select("*")
    .where({ id });
}

function add(posts) {
  return db("posts")
    .insert(posts, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function update(id, change) {
  return db("posts")
    .select("*")
    .where({ id })
    .update(change);
}

function remove(id) {
  return db("posts")
    .select("*")
    .where({ id })
    .del();
}
