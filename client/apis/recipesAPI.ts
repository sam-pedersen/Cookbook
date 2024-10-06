// src/recipeApi.ts

import request from 'superagent'
import { Recipe } from '../../models/recipe'
const API_URL = '/api/recipes' // Adjust base URL as needed

// Fetch all recipes
export function getRecipes(): Promise<Recipe[]> {
  return request.get(API_URL).then((res) => res.body) // Assuming the response has the recipes in the body
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
