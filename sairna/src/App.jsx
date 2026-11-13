import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Home from './pages/homepage/Home'
import About from './pages/aboutpage/About'
import Support from './pages/supportpage/support'
import Booking from './pages/booking/Booking'
import Companies from './pages/companies/Companies'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Account from './pages/account/Account'

function App() {

  return (
    <>
      <Routes>
        <Route element={<MainLayout/>} path="/" >
          <Route index element={<Home/>}/>
          <Route path='/booking' element= {<Booking/>}></Route>
          <Route path='/about' element= {<About/>}></Route>
          <Route path='/support' element= {<Support/>}></Route>
          <Route path="/company" element={<Companies />} />
          <Route path="/login" element={<Login />} />  
          <Route path= "/register" element= {<Register/>}></Route> 
          <Route path= "/account" element={<Account />}/>    
        </Route>
      
      </Routes>
    </>
  )
}

export default App
