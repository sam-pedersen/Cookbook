import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div>
      <Outlet /> {/* Renders the child route component */}
    </div>
  )
}

export default App
