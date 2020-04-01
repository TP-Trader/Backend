exports.seed = function(knex) {
  return knex("users").insert([
    {
      email: "brey@email.com",
      password: "pass",
      city: ""
    },
    {
      email: "wes@email.com",
      password: "pass",
      city: ""
    },
    {
      email: "jasmine@email.com",
      password: "pass",
      city: ""
    }
  ]);
};
