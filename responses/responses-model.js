const db = require("../database/dbconfig");

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
  try {
    const updateResponse = await db("responses").where({ id }).update(updates);
    return updateResponse;
  } catch (err) {
    throw new Error(err);
  }
}

const remove = async (id) => {
  try {
    await db("responses").where({ id }).del();
  } catch (err) {
    throw err;
  }
};

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove,
};
