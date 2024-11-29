import { Outlet, useLocation } from "react-router-dom";
import TicketguruNav from "./NavBar";

const Layout = () => {

    const location = useLocation();

    const hiddenPath = location.pathname === "/login";

    return(
        <div>
            {!hiddenPath && <TicketguruNav />}
            <Outlet />
        </div>
    )
}

export default Layout;