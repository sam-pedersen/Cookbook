export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('recipes').del()

  // Inserts seed entries
  await knex('recipes').insert([
    {
      id: 1,
      title: 'Banana Bread',
      ingredients:
        '2 ripe bananas, 1/2 cup sugar, 1/3 cup melted butter, 1 egg, 1 teaspoon vanilla extract, 1 teaspoon baking soda, pinch of salt, 1 cup flour',
      instructions:
        'Preheat oven to 175°C (350°F). Mash bananas in a mixing bowl. Stir in melted butter. Mix in sugar, egg, and vanilla. Sprinkle baking soda and salt over the mixture. Stir in flour. Pour mixture into a buttered loaf pan. Bake for 60-65 minutes.',
      created_at: new Date().toISOString(), // optional, can be handled by the database default
    },
    {
      id: 2,
      title: 'Apple Pie',
      ingredients:
        '2 cups sliced apples, 1/2 cup sugar, 1 teaspoon cinnamon, 1 tablespoon lemon juice, 1 pie crust',
      instructions:
        'Preheat oven to 220°C (425°F). In a bowl, combine apples, sugar, cinnamon, and lemon juice. Pour the mixture into a pie crust. Cover with another crust and cut slits on top. Bake for 15 minutes, then reduce temperature to 180°C (350°F) and bake for another 30-40 minutes.',
      created_at: new Date().toISOString(), // optional
    },
    {
      id: 3,
      title: 'Feijoa Smoothie',
      ingredients:
        '3 feijoas, 1 banana, 1 cup yogurt, 1 tablespoon honey, ice cubes',
      instructions:
        'Blend feijoas, banana, yogurt, honey, and ice cubes until smooth. Serve immediately.',
      created_at: new Date().toISOString(), // optional
    },
  ])
}
