// models/recipe.ts

import knex from 'knex'

export interface Recipe {
  id: number
  title: string
  ingredients: string
  instructions: string
}

export interface RecipeData {
  title: string
  ingredients: string
  instructions: string
}

class RecipeModel {
  static async create(recipeData: RecipeData) {
    return knex('recipes').insert(recipeData)
  }

  static async getAll(): Promise<Recipe[]> {
    return knex('recipes').select('*')
  }

  // Add other methods like getById, update, and delete if needed
}

export default RecipeModel
