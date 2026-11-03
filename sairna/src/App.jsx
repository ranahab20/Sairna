import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Home from './pages/homepage/Home'

function App() {

  return (
    <>
      <Routes>
        <Route element={<MainLayout/>} path="/" >
          <Route index element={<Home/>}/>
        </Route>

      </Routes>
    </>
  )
}

export default App
