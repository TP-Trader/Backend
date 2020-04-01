exports.up = function(knex) {
  return knex.schema
    .createTable("users", table => {
      table.increments();
      table
        .string("email")
        .notNullable()
        .unique();
      table.string("password").notNullable();
      table.string("city");
    })
    .createTable("posts", table => {
      table.increments();
      table.string("desiredItem").notNullable();
      table.string("postsCity").notNullable();
      table.string("type").notNullable();
      table.string("description").notNullable();
      table.integer("user_id").references("users.id");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("posts").dropTableIfExists("users");
};
