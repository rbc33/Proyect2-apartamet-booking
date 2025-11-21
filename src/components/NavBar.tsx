import React from 'react'
import  logo  from '../assets/logo.png'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='flex'>
        <Link to="/" >
        <div className='flex items-center gap-5'>

        <img src={logo} alt="Logo" className='size-14 mx-auto my-5 rounded-lg'/>
        <h1 className='text-center text-3xl font-bold'>Iron Apts</h1>
        </div>
        </Link>
        </div>
  )
}

export default NavBar