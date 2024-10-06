import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { Recipe } from '../../models/recipe' // Adjust path if necessary
import { getRecipes } from '../apis/recipesAPI' // Ensure these functions are correctly defined

// Fetch all recipes
export const useRecipes = () => {
  // Define your query key and query function
  return useQuery<Recipe[], Error>({
    queryKey: ['recipes'], // This is your query key
    queryFn: getRecipes, // This is the function that fetches the data
  })
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
