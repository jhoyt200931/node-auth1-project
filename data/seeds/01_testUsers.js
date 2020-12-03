
exports.seed = function(knex) {
  // Deletes ALL existing entries
  const users = [
    {
      username: "groot",
      password: "Iamgroot!",
      role: 1,
    },
    {
      username: "admin",
      password: "keepitsecret,keepitsafe.",
      role: 1,
    },
    {
      username: "me",
      password: "changethepass",
      role: 2,
    },
    {
      username: "nobody",
      password: "hasnorole",
    },
    {
      username: "notme",
      password: "hasnorole",
    },
  ];
      return knex('table_name').insert(users);
};
