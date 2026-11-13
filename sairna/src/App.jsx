import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/homepage/Home";
import About from "./pages/aboutpage/About";
import Support from "./pages/supportpage/support";
import BookingLayout from "./layouts/BookingLayout";
import SelectSeat from "./pages/selectSeat/SelectSeat";
import Booking from "./pages/booking/Booking";
import PassengerInfo from "./pages/PassengerInfo/PassengerInfo";
import Companies from "./pages/companies/Companies";
import Account from "./pages/account/Account";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />} path="/">
          <Route index element={<Home />} />
          <Route path="/booking" element={<Booking />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/support" element={<Support />}></Route>
          <Route path="/company" element={<Companies />} />
          <Route path="bookingLayout/:tripId" element={<BookingLayout />}>
            <Route path="selectSeat" element={<SelectSeat />} />
            <Route path="passengerinfo" element={<PassengerInfo/>}/>
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/account" element={<Account/>}/>
          </Route>
      </Routes>
    </>
  );
}

export default App;
