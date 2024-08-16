// import { BrowserRouter } from "react-router-dom";
// import { AppRouter } from "./routes/AppRouter";
import {RoomList} from "./features/client/pages"
import {Nav} from "./features/client/components"

export const App = () => {
  return (
    // <BrowserRouter>
    //   <AppRouter />
    // </BrowserRouter>
    <>
      <Nav />
      <RoomList />
    </>
  );
};