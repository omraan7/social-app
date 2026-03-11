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
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { authcontext } from "../../context/Authcontext";

export default function AppNavBar() {
    const [dark, setDark] = useState((() => localStorage.getItem("dark") === "true"));
    const { user, token, settoken } = useContext(authcontext)

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("dark", dark);
    }, [dark]);
    function logout() {
        localStorage.removeItem("token")
        settoken(null)
    }




    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <>
            {token && <Navbar className="bg-transparent dark:bg-gray-900 dark:text-white" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
                <NavbarContent className="sm:hidden" justify="start">
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                </NavbarContent>

                <NavbarContent className="sm:hidden pr-3" justify="center">
                    <NavbarBrand className="text-2xl font-extrabold text-blue-200" as={Link} to="/">

                        {/* <Code size="44" color="#0099cc" variant="TwoTone" /> */}
                        OMRAN...
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-4" justify="end">
                    <NavbarBrand className="text-2xl font-extrabold text-gray-900 dark:text-gray-200 " as={Link} to="/">

                        {/* <Code size="44" color="#0099cc" variant="TwoTone" /> */}
                        OMRAN...
                    </NavbarBrand>

                    <NavbarItem className="hidden  md:flex w-full  mx-auto space-x-5   justify-center items-center ">
                        {token && <NavLink className={({ isActive }) => ` py-1.5 px-2 text-xl  transition-all duration-200 hover:scale-105  ${isActive ? "dark:text-gray-950 font-bold py-1.5 px-2  bg-gray-200 rounded-xl" : ""}     `} to="posts">
                            Posts
                        </NavLink>}
                        <NavLink className={({ isActive }) => ` py-1.5 px-2 text-xl  transition-all duration-200 hover:scale-105  ${isActive ? "dark:text-gray-950 font-bold py-1.5 px-2  bg-gray-200 rounded-xl" : ""}   `} to="/profile">
                            Profile
                        </NavLink>
                        {/* <NavLink className={({ isActive }) => ` py-1.5 px-2 text-xl  transition-all duration-200 hover:scale-105  ${isActive ? "dark:text-gray-950 font-bold py-1.5 px-2  bg-gray-200 rounded-xl" : ""}   `} to="/pro">
                            Notifications
                        </NavLink> */}

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

                    <button
                        onClick={() => setDark(!dark)}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded"
                    >
                        {dark ? "Light  " : "Dark  "}
                    </button>

                    {token ? <NavbarItem>

                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar

                                    as="button"
                                    className="transition-transform cursor-pointer border-1  border-white bg-white hover:scale-105"

                                    size="sm"
                                    src={user?.photo}
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat" className="w-80 ">
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

                    {token ? <>
                    <Link to="posts" onClick={() => { setIsMenuOpen(false) }} >
                        Posts
                    </Link>
                    <Link to="profile" onClick={() => { setIsMenuOpen(false) }} >
                        Profile
                    </Link>
                    </> : <Link to="register" onClick={() => { setIsMenuOpen(false) }} >
                        Sign Up
                    </Link>
                    }


                </NavbarMenu>
            </Navbar>
            }



        </>
    )
}
