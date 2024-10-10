import { useParams } from 'react-router-dom'
import { useRecipeById } from '../hooks/recipeApi'

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { data: recipe, isLoading, error } = useRecipeById(Number(id))

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Failed to load recipe</p>
  if (!recipe) return <p>Recipe not found</p>

  return (
    <div className="container mx-auto p-6">
      {/* Recipe Image */}
      <div className="mb-6">
        <img
          src={`/path-to-image/${recipe.id}.jpg`} // Placeholder for an actual image
          alt={recipe.title}
          className="h-96 w-full rounded-lg object-cover shadow-lg"
        />
      </div>

      {/* Recipe Title */}
      <h1 className="mb-4 text-5xl font-bold">{recipe.title}</h1>

      {/* Narrative Section */}
      {recipe.narrative && (
        <section className="mb-8">
          <h2 className="mb-4 text-3xl font-semibold">Narrative</h2>
          <p className="whitespace-pre-line text-lg text-gray-700">
            {recipe.narrative}
          </p>
        </section>
      )}

      {/* Ingredients Section */}
      <section className="mb-8">
        <h2 className="mb-4 text-3xl font-semibold">Ingredients</h2>
        <ul className="list-disc space-y-2 pl-5 text-lg text-gray-700">
          {recipe.ingredients.split('\n').map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </section>

      {/* Instructions Section */}
      <section>
        <h2 className="mb-4 text-3xl font-semibold">Instructions</h2>
        <p className="whitespace-pre-line text-lg text-gray-700">
          {recipe.instructions}
        </p>
      </section>

      {/* Back to Home Button */}
      <div className="mt-8">
        <button
          onClick={() => window.history.back()}
          className="rounded bg-gray-800 px-4 py-2 text-white transition-colors hover:bg-gray-600"
        >
          Back to Recipes
        </button>
      </div>
    </div>
  )
}

export default RecipeDetail
