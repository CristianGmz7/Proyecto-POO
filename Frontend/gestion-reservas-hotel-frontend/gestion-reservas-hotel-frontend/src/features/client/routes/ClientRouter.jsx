import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Footer, Nav, SideBar } from "../components";
import { HomePage, RoomList } from "../pages";
import { ReservationList } from "../pages/ReservationList";
import { SideBarReservation } from "../pages/SideBarReservation";
import { Login } from "../pages/Login";
import { ReservationProvider } from "../contexts/reservationContext";

export const ClientRouter = () => {
  return (
    <div className="overflow-x-hidden bg-gray-100 w-screen h-screen">
      <Nav />
      <div className="px-6 py-8 flex">
        <SideBar />
        <div className="flex-1 ml-14 md:ml-48">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<HomePage />} />
            <Route
              element={
                <ReservationProvider>
                  <Outlet />
                </ReservationProvider>
              }
            >
              <Route path="/roomList/:hotelId" element={<RoomList />} />
              <Route path="/ReservationList/:hotelId" element={<ReservationList />} />
            </Route>
            <Route path="/*" element={<Navigate to={"/home"} />} />
            <Route
              path="/SideBarReservation/422d4cbf-8ee7-47f6-93c0-1c339b3a03cf"
              element={<SideBarReservation />}
            />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};
