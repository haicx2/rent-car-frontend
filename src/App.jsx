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
import UserDashBoard from "./assets/components/user/UserDashBoard.jsx";
import ResetPassword from "./assets/components/auth/ResetPassword.jsx";
import PasswordResetRequest from "./assets/components/auth/PasswordResetRequest.jsx";
import EmailVerification from "./assets/components/auth/EmailVerification.jsx";
import UserUpdate from "./assets/components/user/UserUpdate.jsx";
import CarAdd from "./assets/components/car/CarAdd.jsx";
import CarEdit from "./assets/components/car/CarEdit.jsx";

function App() {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
         <Route index element={<Home/>}/>
            <Route path="/cars" element={<CarListing/>}/>
            <Route path="/:userId/add-car" element={<CarAdd/>}/>
            <Route path="/bookingService/:carId" element={<Booking/>}/>
            <Route path="/car/carDetails/:carId" element={<Car/>}/>
            <Route path='/register-user' element={<UserRegistration/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/car/edit-car/:carId' element={<CarEdit/>} />
            <Route path='/user-dashboard/:userId/my-dashboard' element={<UserDashBoard/>} />
            <Route
                path='/password-rest-request'
                element={<PasswordResetRequest />}
            />

            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/email-verification' element={<EmailVerification />} />
            <Route path='/update-user/:userId/update' element={<UserUpdate />} />
        </Route>
    ));

  return (
    <main className=''>
      <RouterProvider router={router}/>
    </main>
  )
}

export default App
