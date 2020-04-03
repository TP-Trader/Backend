const db = require("../database/dbconfig");

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove
};

function find(postId) {
  return db("responses").where({ posts_id: postId });
}

function findBy(filter) {
  return db("responses").where(filter);
}

function findById(id) {
  return db("responses").where({ id });
}

async function add(response, postId) {
  const [id] = await db("responses")
    .insert({ ...response, posts_id: postId })
    .returning("id");

  return findById(id);
}

async function update(id, updates) {
  delete updates.id;
  delete updates.user_id;

  try {
    const updateResponse = await db("responses")
      .where({ id })
      .update(updates);
    return updateResponse;
  } catch (err) {
    throw new Error(err);
  }
}

async function remove(id) {
  try {
    deletedResponse = await findById(id);
    const getResponse = await db("responses")
      .where({ id })
      .del();
    return getResponse ? getResponse : null;
  } catch {
    throw new Error(err);
  }
}
