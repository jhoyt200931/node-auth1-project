
exports.seed = function(knex) {
  // Deletes ALL existing entries
  const users = [
    {
      username: "groot",
      password: "Iamgroot!",
    },
    {
      username: "admin",
      password: "keepitsecret,keepitsafe.",
    },
    {
      username: "me",
      password: "changethepass",
    },
    {
      username: "nobody",
      password: "hasnorole",
    },
    {
      username: "notme",
      password: "hasarole",
    },
  ];
      return knex('users').insert(users);
};
