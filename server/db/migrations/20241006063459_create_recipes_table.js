export async function up(knex) {
  return knex.schema.createTable('recipes', function (table) {
    table.increments('id').primary() // Unique identifier for each recipe
    table.string('title').notNullable() // Title of the recipe
    table.text('ingredients').notNullable() // Ingredients list
    table.text('instructions').notNullable() // Cooking instructions
    table.string('image') // Image file path
    table.text('narrative') // Narrative or description of the recipe
    table.timestamp('created_at').defaultTo(knex.fn.now()) // Timestamp for when the recipe was created
  })
}

export async function down(knex) {
  return knex.schema.dropTable('recipes') // Drops the recipes table if needed
}
