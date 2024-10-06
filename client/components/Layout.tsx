import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <header>
        <h1>Fullstack Boilerplate !</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}
