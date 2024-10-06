import db from './connection' // Import your database connection
import { Recipe, RecipeData } from '../../models/recipe' // Adjust the path based on your structure

// Fetch all recipes
export async function getAllRecipes(): Promise<Recipe[]> {
  return db('recipes').select()
}

// Fetch a recipe by ID
export async function getRecipeById(id: number): Promise<Recipe | undefined> {
  const recipes = await db('recipes').where('id', id).select()
  return recipes.length ? recipes[0] : undefined // Return the recipe or undefined
}

// Create a new recipe
export async function createRecipe(data: RecipeData) {
  return await db('recipes').insert(data)
}

// Update an existing recipe by ID
export async function updateRecipe(data: RecipeData, id: number) {
  const result = await db('recipes').where('id', id).update(data)
  return result > 0 // Return true if at least one row was updated
}

// Delete a recipe by ID
export async function deleteRecipe(id: number) {
  const result = await db('recipes').where({ id }).delete()
  return result > 0 // Return true if at least one row was deleted
}
