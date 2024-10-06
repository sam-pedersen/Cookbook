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
    <div>
      <h1>Recipes</h1>
      <div className="recipe-list">
        {recipes.map((recipe: Recipe) => (
          <div key={recipe.id} className="recipe-card">
            <Link to={`/recipe/${recipe.id}`}>
              <h3>{recipe.title}</h3>
              <p>{recipe.ingredients.substring(0, 100)}...</p>{' '}
              {/* Display a snippet */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
