// import { BrowserRouter } from "react-router-dom";
// import { AppRouter } from "./routes/AppRouter";
import {RoomList} from "./features/client/pages"
import {Nav} from "./features/client/components"
import {SideBar} from "./features/client/components"

export const App = () => {
  return (
    // <BrowserRouter>
    //   <AppRouter />
    // </BrowserRouter>
    <>
      <Nav />
      <div className="flex">
        <SideBar />
        <div className="flex-1 ml-14 md:ml-48">
          <RoomList />
        </div>
      </div>
      {/* Footer */}
    </>
  );
};