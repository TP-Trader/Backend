const db = require("../database/dbconfig");

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove
};

function find() {
  return db("posts").select('*');
}

function findBy(filter) {
  return db("posts").where(filter);
}

function findById(id) {
  return db("posts").select('*').where({ id });
}

async function add(post, userId) {
  const [id] = await db("posts")
    .insert({ ...post, user_id: userId })
    .returning("id");

  return findById(id);
}

async function update(id, updates) {
  delete updates.id;
  delete updates.user_id;

  try {
    const updatePost = await db("posts")
      .where({ id })
      .update(updates);
    return updatePost;
  } catch (err) {
    throw new Error(err);
  }
}

async function remove(id) {
  try {
    deletedPost = await findById(id);
    const getPost = await db("posts")
      .where({ id })
      .del();
    return getPost ? getPost : null;
  } catch {
    throw new Error(err);
  }
}
