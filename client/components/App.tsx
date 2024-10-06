import { useRecipes } from '../hooks/recipeApi'

function App() {
  const { data } = useRecipes()

  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold underline">Fullstack Boilerplate</h1>
        <ul>
          {data && data.map((recipes) => <li key={recipes}>{recipes}</li>)}
        </ul>
      </div>
    </>
  )
}

export default App
