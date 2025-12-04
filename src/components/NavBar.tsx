import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import ThemeToggle from "./ThemeToggle";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = () => {
  const isActiveStyle = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "btn btn-ghost text-primary text-2xl"
      : "btn btn-ghost text-2xl";

  return (
    <div className="navbar bg-base-100 shadow-md mb-5 rounded-box">
      <div className="navbar-start">
        
        <Link to="/" className="btn btn-ghost gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg" />
          <p className="text-2xl font-semibold">IronApts</p>
        </Link>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <NavLink className={isActiveStyle} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={isActiveStyle} to="/newbooking">
              New Booking
            </NavLink>
          </li>
          <li>
            <NavLink className={isActiveStyle} to="/about">
              About
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <ThemeToggle />
      </div>
      <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden focus:bg-slate-300 dark:focus:bg-slate-600">
            <GiHamburgerMenu className="text-xl" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-slate-300 dark:bg-slate-700 rounded-box w-52"
          >
            <li>
              <NavLink to="/"><p className="text-xl">Home</p></NavLink>
            </li>
            <li>
              <NavLink to="/newbooking"><p className="text-xl">New Booking</p></NavLink>
            </li>
            <li>
              <NavLink to="/about"><p className="text-xl">About</p></NavLink>
            </li>
          </ul>
        </div>
    </div>
  );
};

export default NavBar;
