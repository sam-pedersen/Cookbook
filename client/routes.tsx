import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App'
import Homepage from './pages/Homepage'
import RecipeDetail from './pages/RecipeDetail'

// Define your routes
export default createRoutesFromElements(
  <>
    <Route path="/" element={<App />}>
      <Route index element={<Homepage />} /> {/* Index route for Homepage */}
      <Route path="recipe/:id" element={<RecipeDetail />} />{' '}
      {/* Dynamic route for RecipeDetail */}
    </Route>
  </>,
)
