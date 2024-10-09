// src/components/RecipeList.tsx

import React from 'react'
import { useRecipes } from '../hooks/recipeApi'
import { Recipe } from '../../models/recipe' // Ensure this points to your Recipe type

const RecipeList: React.FC = () => {
  const { data: recipes = [], isLoading, isError } = useRecipes() // Default to an empty array

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading recipes</p>

  return (
    <div>
      <h2>Recipe List</h2>
      <ul>
        {recipes.map((recipe: Recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>
              <strong>Ingredients:</strong> {recipe.ingredients}
            </p>
            <p>
              <strong>Instructions:</strong> {recipe.instructions}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecipeList
