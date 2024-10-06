export async function up(knex) {
  return knex.schema.createTable('recipes', function (table) {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.text('ingredients').notNullable()
    table.text('instructions').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  return knex.schema.dropTable('recipes')
}
