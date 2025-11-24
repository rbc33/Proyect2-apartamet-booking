import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import ThemeToggle from './ThemeToggle'

const NavBar = () => {
  const isActiveStyle = ({ isActive }:{isActive: boolean}) =>
					isActive ? ' text-slate-500 dark:text-slate-400' : 'hover:text-slate-500 dark:hover:text-slate-400!'
				
  return (
    <div className='flex justify-between items-center border-b-2 border-slate-600'>
        <Link to="/" >
        <div className='flex items-center gap-5'>

        <img src={logo} alt="Logo" className='size-14 mx-auto mb-5 rounded-lg'/>
        <h1 className='text-center text-3xl font-bold'>Iron Apts</h1>
        </div>
        </Link>
        <div className='grow flex items-center'></div>
        <NavLink
				className={isActiveStyle}
				to="/"
			><button className='text-2xl   mr-5'>Home</button></NavLink>
        <NavLink
				className={isActiveStyle}
			 to="/newbooking"><button className='text-2xl  mr-5'>New Booking</button></NavLink>
        <NavLink
				className={isActiveStyle}
			 to="/about"><button className='text-2xl   mr-5'>About</button></NavLink>
       <ThemeToggle />
        </div>
  )
}

export default NavBar