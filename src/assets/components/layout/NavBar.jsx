import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import {logout} from "../auth/AuthService.js";

export default function NavBar() {
    const isLoggedIn = localStorage.getItem("authToken")
    const {userId} = useParams();
    const userRoles = localStorage.getItem("userRoles") || []
    const handleLogout = () => {
        logout()
    }
    return (
        <Navbar expand='lg' sticky='top' className='nav-bg'>
            <Container>
                <Navbar.Brand to={"/"} as={Link} className='nav-home'>
                    Auto Quest
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link to={"/cars"} as={Link}>
                            See our Selection of cars
                        </Nav.Link>
                        {userRoles.includes("ROLE_OWNER") && (
                            <>
                                <Nav.Link to={`/${userId}/add-car`} as={Link}>
                                    Add Car
                                </Nav.Link>
                            </>
                        )
                        }
                    </Nav>
                    <Nav>
                        <NavDropdown title='Account' id='basic-nav-dropdown'>
                            {!isLoggedIn ? (
                                <>
                                    <NavDropdown.Item to={"/register-user"} as={Link}>
                                        Register
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item to={"/login"} as={Link}>
                                        Login
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                </>
                            ) : (
                                <>
                                <NavDropdown.Item to={`/user-dashboard/${userId}/my-dashboard`} as={Link}>
                                    My Dashboard
                                </NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item to={"#"} as={Link}
                                onClick={handleLogout}
                                >
                                    Logout
                                </NavDropdown.Item>
                                </>
                            )}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
)
}