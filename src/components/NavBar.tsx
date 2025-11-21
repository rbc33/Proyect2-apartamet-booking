import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

const NavBar = () => {
  return (
    <div className='flex justify-between items-center border-b-2 border-slate-600'>
        <Link to="/" >
        <div className='flex items-center gap-5'>

        <img src={logo} alt="Logo" className='size-14 mx-auto my-5 rounded-lg'/>
        <h1 className='text-center text-3xl font-bold'>Iron Apts</h1>
        </div>
        </Link>
        <div className='grow'></div>
        <NavLink
				className={({ isActive }) =>
					isActive ? 'text-slate-400' : 'hover:text-slate-400!'
				}
				to="/"
			><button className='text-2xl  mt-5 mr-5'>Home</button></NavLink>
        <NavLink
				className={({ isActive }) =>
					isActive ? 'text-slate-400' : 'hover:text-slate-400!'
				}
			 to="/newbooking"><button className='text-2xl mt-5 mr-5'>New Booking</button></NavLink>
        <NavLink
				className={({ isActive }) =>
					isActive ? 'text-slate-400' : 'hover:text-slate-400!'
				}
			 to="/about"><button className='text-2xl  mt-5 mr-5'>About</button></NavLink>
        </div>
  )
}

export default NavBar