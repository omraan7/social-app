import {
    Navbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenuItem,
    NavbarMenu,
    NavbarContent,
    NavbarItem,

    Button,
    DropdownItem,
    Dropdown,
    DropdownTrigger,
    Avatar,
    DropdownMenu,
} from "@heroui/react";
import { Code } from "iconsax-reactjs";
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { authcontext } from "../../context/Authcontext";
import { set } from "zod";
export default function AppNavBar() {
    function logout() {
        localStorage.removeItem("token")
        settoken(null)
    }
    const { user } = useContext(authcontext)




    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { token } = useContext(authcontext)
    return (
        <>
            {token && <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
                <NavbarContent className="sm:hidden" justify="start">
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                </NavbarContent>

                <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand className="text-2xl font-extrabold text-blue-900" as={Link} to="/">

                        {/* <Code size="44" color="#0099cc" variant="TwoTone" /> */}
                        OMRAN...
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-4" justify="end">
                    <NavbarBrand className="text-2xl font-extrabold text-blue-900" as={Link} to="/">

                        {/* <Code size="44" color="#0099cc" variant="TwoTone" /> */}
                        OMRAN...
                    </NavbarBrand>

                    <NavbarItem className= "hidden  md:flex w-full  mx-auto space-x-5  justify-center items-center ">
                        {token && <NavLink className={({ isActive }) => `text-xl  transition-all duration-700  ${isActive ? "text-blue-500 text-3xl" : ""}     `} to="posts">
                            Posts
                        </NavLink>
                        }
                        <NavLink className={({ isActive }) => `text-xl  transition-all duration-700  ${isActive ? "text-blue-500 text-3xl" : ""}   `} to="/profile">
                            Profile
                        </NavLink> 
                         <NavLink className={({ isActive }) => `text-xl  transition-all duration-700  ${isActive ? "text-blue-500 text-3xl" : ""}   `} to="/pro">
                            Notifications
                        </NavLink>
                        
                    </NavbarItem>
                      {/* <NavbarItem className="space-x-10">
                        {token && <NavLink className={({ isActive }) => `text-3xl ${isActive ? "text-blue-500" : ""}   `} to="posts">
                            Posts
                        </NavLink>
                        }
                        <NavLink className={({ isActive }) => `text-3xl ${isActive ? "text-blue-500" : ""}   `} to="/profile">
                            Notifications
                        </NavLink>
                    </NavbarItem> */}
                </NavbarContent>

                <NavbarContent justify="start ">


                    {token ? <NavbarItem>

                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform cursor-pointer"
                                    color="success"
                                    name="Jason Hughes"
                                    size="sm"
                                    src={user?.photo}
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat" className="w-80">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold  ">{user?.name}</p>

                                    <p className="font-semibold  ">{user?.email}</p>
                                </DropdownItem>
                                <DropdownItem as={Link} to="Profile" key="Profile">Profile</DropdownItem>


                                <DropdownItem key="help_and_feedback" as={Link} to="/ChangePassword">Change Password</DropdownItem>
                                <DropdownItem as={Link} to="/login" onClick={() => {
                                    logout()
                                }} key="logout" color="danger">
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem> :
                        <NavbarItem>
                            <Button as={Link} to="register" color="primary" href="#" variant="shadow">
                                Sign Up
                            </Button>
                        </NavbarItem>}

                </NavbarContent>
                <NavbarMenu>

                    {token ? <Link to="posts" onClick={() => { setIsMenuOpen(false) }} >
                        Posts
                    </Link> : <Link to="register" onClick={() => { setIsMenuOpen(false) }} >
                        Sign Up
                    </Link>
                    }


                </NavbarMenu>
            </Navbar>
            }



        </>
    )
}
