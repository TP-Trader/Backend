exports.seed = function(knex) {
  return knex("posts").insert([
    {
      desiredItem: "bread",
      postsCity: "Whoville",
      type: "food",
      description: "any type of bread",
      user_id: 1
    },
    {
      desiredItem: "lawn mowed",
      postsCity: "Devsburg",
      type: "labor",
      description: "I need my grass mowed",
      user_id: 2
    },
    {
      desiredItem: "milk",
      postsCity: "Tinytown",
      type: "food",
      description: "whole milk",
      user_id: 3
    }
  ]);
};
