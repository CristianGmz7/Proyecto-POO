// import { BrowserRouter } from "react-router-dom";
// import { AppRouter } from "./routes/AppRouter";
import {RoomList, HomePage} from "./features/client/pages"
import { Footer } from "./features/client/components";

export const App = () => {
  return (
    // <BrowserRouter>
    //   <AppRouter />
    // </BrowserRouter>
    // <div className="bg-yellow-500 w-full h-full text-4xl">Hola</div>
    // <RoomList/>
    // <RoomList />
    <div>
      <HomePage/>
      <Footer/>
    </div>
  );
};