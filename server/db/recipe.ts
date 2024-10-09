import db from './connection'
import { Recipe, RecipeData } from '../../models/recipe' // Assuming you have types defined

// Get all recipes
export async function getAllRecipes(): Promise<Recipe[]> {
  return db('recipes').select('*')
}

// Get a single recipe by ID
export async function getRecipeById(id: number): Promise<Recipe | null> {
  const recipe = await db('recipes').where({ id }).first()
  return recipe || null
}

// Create a new recipe
export async function createRecipe(recipeData: RecipeData): Promise<void> {
  await db('recipes').insert(recipeData)
}

// Update a recipe by ID
export async function updateRecipe(
  id: number,
  updatedRecipe: Partial<Recipe>,
): Promise<void> {
  await db('recipes').where({ id }).update(updatedRecipe)
}

// Delete a recipe by ID
export async function deleteRecipe(id: number): Promise<void> {
  await db('recipes').where({ id }).del()
}
