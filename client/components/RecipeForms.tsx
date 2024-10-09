import React, { useState } from 'react'
import { useCreateRecipe } from '../hooks/recipeApi'
import { Recipe } from '../../models/recipe' // Adjust path as necessary

const RecipeForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const mutation = useCreateRecipe()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (file) {
      mutation.mutate(file, {
        onSuccess: (data: Recipe) => {
          setMessage('Recipe uploaded successfully!')
          console.log('Uploaded Recipe:', data) // Log the uploaded recipe for debugging
          setFile(null) // Reset the file input
        },
        onError: (error: Error) => {
          setMessage(`Failed to upload recipe: ${error.message}`)
        },
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Recipe</h2>
      <input type="file" accept=".docx" onChange={handleFileChange} />
      <button type="submit"></button>
      {mutation.isError && <p>Error: {mutation.error?.message}</p>}
      {message && <p>{message}</p>}
    </form>
  )
}

export default RecipeForm
