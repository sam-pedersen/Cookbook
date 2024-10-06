import React from 'react'
import { useParams } from 'react-router-dom'
import { useRecipeById } from '../hooks/recipeApi'

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: recipe, isLoading, error } = useRecipeById(Number(id))

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Failed to load recipe</p>
  if (!recipe) return <p>Recipe not found</p>

  return (
    <div>
      <h1>{recipe.title}</h1>
      <h3>Ingredients</h3>
      <p>{recipe.ingredients}</p>

      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
    </div>
  )
}

export default RecipeDetail
