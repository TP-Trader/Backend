exports.seed = function(knex) {
  return knex("posts").insert([
    {
      desiredItem: "mowed lawn",
      postsCity: "Whoville",
      type: "yard work",
      description: "mow my lawn and trim the shrubs",
      user_id: 1
    },
    {
      desiredItem: "loaf of sunbeam",
      postsCity: "Devsburg",
      type: "food",
      description: "full loaf of bread",
      user_id: 2
    },
    {
      desiredItem: "frozen pizza",
      postsCity: "Quarantown",
      type: "food",
      description: "Red Baron pepperoni pizza",
      user_id: 3
    }
  ]);
};
