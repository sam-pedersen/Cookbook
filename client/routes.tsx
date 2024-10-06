import { createRoutesFromElements, Route, Routes } from 'react-router-dom'
import App from './components/App'
import Homepage from './pages/Homepage'
import RecipeDetail from './pages/RecipeDetail'

// Define your routes
export default createRoutesFromElements(
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Homepage />} /> {/* This is the index route */}
      <Route path="recipe/:id" element={<RecipeDetail />} />{' '}
    </Route>
  </Routes>,
)
