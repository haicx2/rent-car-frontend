import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./assets/components/home/Home.jsx";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import RootLayout from "./assets/components/layout/RootLayout.jsx";
import CarListing from "./assets/components/car/CarListing.jsx";
import Booking from "./assets/components/booking/Booking.jsx";

function App() {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
         <Route index element={<Home/>}/>
            <Route path="/cars" element={<CarListing/>}/>
            <Route path="/bookCar/:carId" element={<Booking/>}/>
        </Route>
    ));

  return (
    <main className=''>
      <RouterProvider router={router}/>
    </main>
  )
}

export default App
