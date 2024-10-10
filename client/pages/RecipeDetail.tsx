import { useParams } from 'react-router-dom'
import { useRecipeById } from '../hooks/recipeApi'

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { data: recipe, isLoading, error } = useRecipeById(Number(id))

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Failed to load recipe</p>
  if (!recipe) return <p>Recipe not found</p>

  return (
    <div className="container mx-auto max-w-screen-lg p-8">
      <div className="mb-12">
        <img
          src={`/${recipe.image}`}
          alt={recipe.title}
          className="h-auto w-full rounded-lg object-cover shadow-lg"
        />
      </div>

      <h1 className="mb-8 text-center text-5xl font-extrabold tracking-tight text-gray-900">
        {recipe.title}
      </h1>

      <section className="mb-12">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Description
        </h2>
        <div className="mx-auto max-w-lg text-lg leading-relaxed text-gray-600">
          {recipe.narrative}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Ingredients
        </h2>
        <ul className="font-georgia mx-auto max-w-lg list-inside list-disc space-y-4 text-lg text-gray-600">
          {recipe.ingredients
            .split('\n')
            .filter((ingredient: string) => ingredient.trim() !== '')
            .map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Instructions
        </h2>
        <p className="mx-auto max-w-lg whitespace-pre-line text-lg leading-relaxed text-gray-600">
          {recipe.instructions}
        </p>
      </section>

      <div className="mt-12 flex justify-center">
        <button
          onClick={() => window.history.back()}
          className="transform rounded-full bg-black px-6 py-3 text-lg font-semibold text-white transition-transform hover:scale-105"
        >
          Back to Recipes
        </button>
      </div>
    </div>
  )
}

export default RecipeDetail
