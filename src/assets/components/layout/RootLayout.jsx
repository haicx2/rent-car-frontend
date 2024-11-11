import {Outlet} from "react-router-dom";
import BackGroundImageSlider from "../common/BackGroundImageSlider.jsx";
import NavBar from "./NavBar.jsx";

export default function RootLayout() {
    return (
        <main>
            <NavBar/>
            <BackGroundImageSlider/>
            <div>
                <Outlet/>
            </div>
        </main>
    )
}