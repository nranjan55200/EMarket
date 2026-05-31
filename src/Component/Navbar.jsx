import { Link, NavLink } from "react-router-dom";
import { Contact, MapPin } from "lucide-react";
import { CgClose } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa";
import { HiMenuAlt1, HiMenuAlt3, HiOutlineShoppingCart } from "react-icons/hi";
import {
  SignInButton,
  UserButton,
  SignUpButton,
  SignedOut,
  SignedIn,
} from "@clerk/clerk-react";
import { useCart } from "../Context/CartContext";
import { useState } from "react";
import ResponsiveMenu from "./ResponsiveMenu";

const Navbar = ({ location, getlocation, openDropdown, setOpenDropdown }) => {
  const { cartItem } = useCart();
  const [openNav, setOpenNav] = useState(false);

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };
  return (
    <div className="bg-white py-3 shadow-2xl ">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* logo section */}
        <div className="flex gap-7 items-center">
          <Link to={"/"}>
            <h1 className="font-bold text-3xl">
              <span className="text-red-500 font-serif">E</span>Market
            </h1>
          </Link>
          <div className="md:flex gap-1 cursor-pointer text-gray-700 items-center hidden">
            <MapPin className="text-red-500"></MapPin>
            <div className="font-semibold">
              {location ? (
                <div className="-space-y-2">
                  <p>{location.residential}</p>
                  <p>{location.state}</p>
                </div>
              ) : (
                "Add Address"
              )}
            </div>
            <FaCaretDown onClick={toggleDropdown} />
          </div>
          {openDropdown ? (
            <div className="w-[250px] h-max shadow-2xl z-50 bg-white fixed top-16 left-60 border-2 p-5 border-gray-100 rounded-md">
              <h1 className="font-semibold mb-4 text-xl flex justify-between">
                Change Location
                <span onClick={toggleDropdown}>
                  <CgClose />
                </span>
              </h1>
              <button
                onClick={getlocation}
                className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400"
              >
                Detect my location
              </button>
            </div>
          ) : null}
        </div>
        {/* Menu Section*/}
        <nav className="flex gap-7 items-center">
          <ul className="md:flex gap-7 items-center text-xl font-semibold hidden">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `${isActive ? "border-b-3 transition-all border-red-500 hover:text-blue-500" : "text-black"} curser-pointer`
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/Product"}
              className={({ isActive }) =>
                `${isActive ? "border-b-3 transition-all border-red-500 hover:text-blue-500" : "text-black"} curser-pointer`
              }
            >
              <li>Products</li>
            </NavLink>
            <NavLink
              to={"/About"}
              className={({ isActive }) =>
                `${isActive ? "border-b-3 transition-all border-red-500 hover:text-blue-500" : "text-black"} curser-pointer`
              }
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to={"/Contact"}
              className={({ isActive }) =>
                `${isActive ? "border-b-3 transition-all border-red-500 hover:text-blue-500" : "text-black"} curser-pointer`
              }
            >
              <li>Contact</li>
            </NavLink>
          </ul>
          {/* Cart Icon */}
          <Link to={"/Cart"} className="relative cursor-pointer">
            <HiOutlineShoppingCart className="text-3xl text-gray-700 hover:text-blue-500" />

            {/* Badge */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {cartItem.length}
            </span>
          </Link>
          <div className="hidden md:block">
            <header className="flex gap-4 items-center ">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </header>
          </div>
          {openNav ? (
            <HiMenuAlt3
              onClick={() => setOpenNav(false)}
              className="h-7 w-7 md:hidden"
            />
          ) : (
            <HiMenuAlt1
              onClick={() => setOpenNav(true)}
              className="h-7 w-7 md:hidden"
            />
          )}
        </nav>
      </div>
      <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav}/>
    </div>
  );
};

export default Navbar;
