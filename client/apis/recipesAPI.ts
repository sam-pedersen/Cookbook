import request from 'superagent'
import { Recipe } from '../../models/recipe'
const API_URL = '/api/v1/recipes'

// Fetch all recipes
export function getRecipes(): Promise<Recipe[]> {
  return request.get(API_URL).then((res) => res.body)
}

// Create a new recipe
export function createRecipe(file: File): Promise<Recipe[]> {
  const formData = new FormData()
  formData.append('recipeFile', file)

  return request
    .post(API_URL)
    .send(formData)
    .then((res) => res.body)
}
