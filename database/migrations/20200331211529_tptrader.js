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
      table
        .enu("type", ["Food", "Labor", "Household Item", "Other"])
        .notNullable();
      table.string("description").notNullable();
      table.datetime("date");
      table.integer("user_id").references("users.id");
    })
    .createTable("responses", table => {
      table.increments();
      table.string("item").notNullable();
      table.string("description").notNullable();
      table.datetime("date").notNullable();
      table
        .boolean("accept")
        .defaultTo(true)
        .notNullable();
      table.integer("posts_id").references("posts.id");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("responses")
    .dropTableIfExists("posts")
    .dropTableIfExists("users");
};
