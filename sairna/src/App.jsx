import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/homepage/Home";
import About from "./pages/aboutpage/About";
import Support from "./pages/supportpage/support";
import BookingLayout from "./layouts/BookingLayout";
import SelectSeat from "./pages/selectSeat/SelectSeat";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />} path="/">
          <Route index element={<Home />} />
          <Route path="/about" element={<About />}></Route>
          <Route path="/support" element={<Support />}></Route>
          <Route path="/bookingLayout" element={<BookingLayout />}>
            <Route path="/bookingLayout/selectSeat" element={<SelectSeat/>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
