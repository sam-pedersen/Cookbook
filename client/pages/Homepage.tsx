import { Link } from 'react-router-dom'
import { useRecipes } from '../hooks/recipeApi'
import { Recipe } from '../../models/recipe'

const Home = () => {
  const { data: recipes, isLoading, error } = useRecipes()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Failed to load recipes</p>

  // Explicitly check that recipes is an array before mapping
  if (!recipes || !Array.isArray(recipes)) {
    return <p>No recipes available</p>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-center text-4xl font-bold">Recipes</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe: Recipe) => (
          <div
            key={recipe.id}
            className="recipe-card rounded-lg bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg"
          >
            <Link to={`/recipe/${recipe.id}`}>
              <h3 className="mb-2 text-xl font-semibold">{recipe.title}</h3>
              <p className="text-gray-600">
                {recipe.ingredients.substring(0, 100)}...
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
