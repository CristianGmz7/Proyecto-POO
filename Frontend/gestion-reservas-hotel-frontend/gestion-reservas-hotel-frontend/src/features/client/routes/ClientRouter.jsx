import { Routes, Route, Navigate } from "react-router-dom"
import { Footer, Nav, SideBar } from "../components"
import { HomePage, RoomList} from "../pages"
import { ReservationList } from "../pages/ReservationList"
import { SideBarReservation } from "../pages/SideBarReservation"
import { Login } from "../pages/Login"

export const ClientRouter = () => {
  return (
    <div  className="overflow-x-hidden bg-gray-100 w-screen h-screen bg-hero-pattern bg-no-repeat bg-cover">
        <Nav/>
        <div className="px-6 py-8 flex">
            <SideBar/>
            <div  className="flex-1 ml-14 md:ml-48">
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/roomList/bc41c7dc-97cc-4054-a1e7-7e97768719d9' element={<RoomList />} />
                    <Route path='/*' element={<Navigate to={"/home"} />} />
                    <Route path='/SideBarReservation/422d4cbf-8ee7-47f6-93c0-1c339b3a03cf' element={<SideBarReservation />} />
                    <Route path='/ReservationList/0f529c92-2d29-41a3-957a-e3601d0c77c9' element={<ReservationList/>} />
                </Routes>
            </div>
        </div>
        <Footer/>
    </div>
  )
}
