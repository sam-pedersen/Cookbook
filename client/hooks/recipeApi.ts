import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { Recipe } from '../../models/recipe'

// Fetch all recipes
export const useRecipes = () => {
  const queryKey = ['recipes'] // Define the query key
  const queryFn = async (): Promise<Recipe[]> => {
    const response = await fetch('/api/v1/recipes')
    if (!response.ok) {
      throw new Error('Failed to fetch recipes')
    }
    return response.json()
  }

  return useQuery<Recipe[]>(queryKey, queryFn)
}

// Fetch a single recipe by ID
export const useRecipeById = (id: number) => {
  const queryKey = ['recipe', id] // Define the query key
  const queryFn = async (): Promise<Recipe> => {
    const response = await fetch(`/api/v1/recipes/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch recipe')
    }
    return response.json()
  }

  return useQuery<Recipe>(queryKey, queryFn)
}

// Create a new recipe
export const useCreateRecipe = () => {
  const queryClient = useQueryClient()

  return useMutation<Recipe, Error, File>(
    // Mutation function
    async (file: File) => {
      const formData = new FormData()
      formData.append('recipeFile', file)

      const response = await fetch('/api/v1/recipes', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to create recipe')
      }

      return response.json() // Ensure the API returns a Recipe object
    },
    {
      onSuccess: () => {
        // Invalidate the 'recipes' query to refetch the latest data
        queryClient.invalidateQueries(['recipes'])
      },
      onError: (error: Error) => {
        console.error('Error uploading recipe:', error)
      },
    },
  )
}
