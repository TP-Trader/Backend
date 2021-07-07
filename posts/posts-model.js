const db = require("../database/dbconfig");

module.exports = {
  find,
  findBy,
  findById,
  findByUser,
  add,
  update,
  remove,
};

function find() {
  return db("posts").select("*").orderBy('date','desc');
}

function findByUser(userId) {
  return db("posts").where({ user_id: userId });
}

function findBy(filter) {
  return db("posts").where(filter);
}

function findById(id) {
  return db("posts").where({ id });
}

async function add(post) {
  const [id] = await db("posts").insert(post).returning("id");

  return findById(id);
}

async function update(post, id) {
  try {
    const updatePost = await db("posts").where({ id }).update(post);
    return updatePost;
  } catch (err) {
    throw new Error(err);
  }
}

async function remove(id) {
  try {
    deletedPost = await findById(id);
    const getPost = await db("posts").where({ id }).del();
    return getPost ? getPost : null;
  } catch (err) {
    throw new Error(err);
  }
}
