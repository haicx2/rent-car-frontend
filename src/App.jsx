import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./assets/components/home/Home.jsx";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import RootLayout from "./assets/components/layout/RootLayout.jsx";
import CarListing from "./assets/components/car/CarListing.jsx";
import Booking from "./assets/components/booking/Booking.jsx";
import Car from "./assets/components/car/Car.jsx";
import UserRegistration from "./assets/components/user/UserRegistration.jsx";
import Login from "./assets/components/auth/Login.jsx";
import CarUploadImage from "./assets/components/car/CarUploadImage.jsx";
import UserDashBoard from "./assets/components/user/UserDashBoard.jsx";

function App() {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
         <Route index element={<Home/>}/>
            <Route path="/cars" element={<CarListing/>}/>
            <Route path="/bookingService/:carId" element={<Booking/>}/>
            <Route path="/car/carDetails/:carId" element={<Car/>}/>
            <Route path='/register-user' element={<UserRegistration/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/car/upload-image/:carId' element={<CarUploadImage/>} />
            <Route path='/user-dashboard/:userId/my-dashboard' element={<UserDashBoard/>} />
        </Route>
    ));

  return (
    <main className=''>
      <RouterProvider router={router}/>
    </main>
  )
}

export default App
