import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// Fetch all recipes
export const useRecipes = () => {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: async () => {
      const response = await fetch('/api/v1/recipes')
      if (!response.ok) {
        throw new Error('Failed to fetch recipes')
      }
      return response.json()
    },
  })
}

// Fetch a single recipe by ID
export const useRecipeById = (id: number) => {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: async () => {
      const response = await fetch(`/api/v1/recipes/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch recipe')
      }
      return response.json()
    },
  })
}
export const useCreateRecipe = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append('recipeFile', file)

      const response = await fetch('/api/v1/recipes', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to create recipe')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['recipes'])
    },
  })
}
