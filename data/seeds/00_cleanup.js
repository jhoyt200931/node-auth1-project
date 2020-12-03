const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return cleaner
    .clean(knex, {
      model: "delete",
      restartIdentity: true,
      ignoreTables: ['knex_migrations', 'knex_migrations_lock']
    })
};
