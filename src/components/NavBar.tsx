import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import ThemeToggle from "./ThemeToggle";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = () => {
  const isActiveStyle = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? " text-slate-500 dark:text-slate-400"
      : "hover:text-slate-500 dark:hover:text-slate-400!";

  return (
    <div className="flex justify-between items-center border-b-2 border-slate-600 mb-5">
      <Link to="/">
        <div className="flex items-center gap-5">
          <img
            src={logo}
            alt="Logo"
            className="size-14 mx-auto mb-5 rounded-lg"
          />
          <h1 className="text-center text-3xl font-bold">Iron Apts</h1>
        </div>
      </Link>
      <div className="hidden grow md:flex items-center justify-end">
        <NavLink className={isActiveStyle} to="/">
          <button className="text-2xl mr-5">Home</button>
        </NavLink>
        <NavLink className={isActiveStyle} to="/newbooking">
          <button className="text-2xl  mr-5">New Booking</button>
        </NavLink>
        <NavLink className={isActiveStyle} to="/about">
          <button className="text-2xl   mr-5">About</button>
        </NavLink>
        <ThemeToggle />
      </div>
      <div className="md:hidden dropdown dropdown-end">
        <ThemeToggle />
        <div tabIndex={0} role="button" className="btn bg-base-300 dark:bg-[#393d4e] m-1 mx-2">
          <GiHamburgerMenu />
        </div>
        <ul
          tabIndex={-1}
          className="dropdown-content menu bg-base-300 dark:bg-[#393d4e] rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li>
            <NavLink className={isActiveStyle} to="/">
              <button className="text-2xl">Home</button>
            </NavLink>
          </li>
          <li>
            <NavLink className={isActiveStyle} to="/newbooking">
              <button className="text-2xl">New Booking</button>
            </NavLink>
          </li>
          <li>
            <NavLink className={isActiveStyle} to="/about">
              <button className="text-2xl">About</button>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
