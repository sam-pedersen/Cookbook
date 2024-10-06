import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div>
      <h1>Welcome to Recipe App</h1>
      <Outlet /> {/* Renders the child route component */}
    </div>
  )
}

export default App
