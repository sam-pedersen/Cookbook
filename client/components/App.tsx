import { useRecipes } from '../hooks/recipeApi'
import { Recipe } from '../../models/recipe'

function App() {
  const { data } = useRecipes()

  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold underline">Fullstack Boilerplate</h1>
        <ul>
          {data &&
            data.map((recipe: Recipe) => (
              <li key={recipe.id}>
                {' '}
                {/* Use the unique id as the key */}
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
    </>
  )
}

export default App
