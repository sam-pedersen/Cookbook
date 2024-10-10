import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App'
import Homepage from './pages/Homepage'
import RecipeDetail from './pages/RecipeDetail'

export default createRoutesFromElements(
  <>
    <Route path="/" element={<App />}>
      <Route index element={<Homepage />} />
      <Route path="recipe/:id" element={<RecipeDetail />} />{' '}
    </Route>
  </>,
)
