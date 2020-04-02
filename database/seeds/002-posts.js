exports.seed = function(knex) {
  return knex("posts").insert([
    {
      desiredItem: "toilet paper",
      postsCity: "Whoville",
      type: "Household Item",
      description: "anything will do, I'm desperate.",
      date: "2020-04-05 16:00:00",
      user_id: 1
    },
    {
      desiredItem: "lawn mowed",
      postsCity: "Devsburg",
      type: "Labor",
      description: "I need my grass mowed",
      date: "2020-04-06 10:00:00",
      user_id: 2
    },
    {
      desiredItem: "milk",
      postsCity: "Tinytown",
      type: "Food",
      description: "whole milk",
      date: "2020-04-07 12:00:00",
      user_id: 3
    }
  ]);
};
