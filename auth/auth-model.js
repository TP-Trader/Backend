const db = require("../database/dbConfig");

module.exports = {
  add,
  findBy,
  findById,
  getUser
};

function add(user) {
  console.log(user);
  return db("users").insert(user);
  // .then(ids => {
  //   const [id] = ids;
  //   return findById(id);
  // });
}
function findBy(email) {
  return db("users")
    .select("*")
    .where({ email });
}

function findById(id) {
  return db("users")
    .select("*")
    .where({ id });
}

function getUser(email) {
  return db("users").select("id").where({email});
}
