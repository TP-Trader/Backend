const db = require("../database/dbconfig");

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove
};

function find(userId) {
  return db("posts").where({ user_id: userId });
}

function findBy(filter) {
  return db("posts").where(filter);
}

function findById(id) {
  return db("posts").where({ id });
}

async function add(post, userId) {
  const [id] = await db("posts")
    .insert({ ...post, user_id: userId })
    .returning("id");

  return findById(id);
}

// function add(posts) {
//   return db("posts")
//     .insert(posts, "id")
//     .then(ids => {
//       const [id] = ids;
//       return findById(id);
//     });
// }

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

// function update(id, change) {
//   return db("posts")
//     .select("*")
//     .where({ id })
//     .update(change);
// }

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

// function remove(id) {
//   return db("posts")
//     .select("*")
//     .where({ id })
//     .del();
// }
