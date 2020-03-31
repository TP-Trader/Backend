exports.seed = function(knex) {
  return knex("users").insert([
    {
      email: "brey@email.com",
      username: "brey",
      password: "pass"
    },
    {
      email: "wes@email.com",
      username: "wes",
      password: "pass"
    },
    {
      email: "jasmine@email.com",
      username: "jazz",
      password: "pass"
    }
  ]);
};
