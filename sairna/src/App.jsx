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
function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />} path="/">
          <Route index element={<Home />} />
          <Route path="/about" element={<About />}></Route>
          <Route path="/support" element={<Support />}></Route>
          <Route path="/Booking" element={<Booking />}></Route>
          <Route path="/bookingLayout/:tripId" element={<BookingLayout />}>
            <Route path="selectSeat" element={<SelectSeat />} />
            <Route path="passengerinfo" element={<PassengerInfo/>}/>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
