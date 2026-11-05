import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Home from './pages/homepage/Home'
import About from './pages/aboutpage/About'

function App() {

  return (
    <>
      <Routes>
        <Route element={<MainLayout/>} path="/" >
          <Route index element={<Home/>}/>
          <Route path='/about' element= {<About/>}></Route>
        </Route>
      
      </Routes>
    </>
  )
}

export default App
