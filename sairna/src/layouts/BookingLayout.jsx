import { Outlet } from "react-router-dom"
import BookingSteps from "../components/shared/BookingSteps"

function BookingLayout() {
  return (
    <div className="py-[100px] px-[120px] min-h-screen bg-bg">
      <BookingSteps/>
      <div>
        <main>
            <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default BookingLayout
