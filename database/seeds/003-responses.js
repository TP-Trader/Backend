exports.seed = function(knex) {
  return knex("responses").insert([
    {
      item: "bread",
      description: "I have white bread",
      date: "2020-04-07 11:00:00",
      accept: true,
      posts_id: 2
    },
    {
      item: "lawn mower",
      description: "I have a mower you can use, but I can't leave the house.",
      date: "2020-04-09 8:30:00",
      accept: true,
      posts_id: 3
    },
    {
      item: "milk",
      description: "I could use some milk. Wanna trade?",
      date: "2020-04-08 19:00:00",
      accept: false,
      posts_id: 1
    }
  ]);
};
