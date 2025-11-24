import { useEffect, useState } from 'react'
import { BASE_URL } from './NewBooking'
import AptCard from '../components/AptCard'
import { type Apartment } from '../types/types'

const HomePage = () => {
    const [apartaments, setApartaments] = useState<Apartment[]|[]>([])

    useEffect(() => {
        const fetchApts = async () => {
        const res = await fetch(BASE_URL+ "/apartments")
        const data = await res.json()

        setApartaments(data)
        console.log(data)
    }
    fetchApts()
    }, [])
  return (
    <><h1 className='text-center text-5xl'>Apartments list</h1>
        <div className="grid grid-cols-2 gap-4">
        {apartaments && apartaments.map((apartment) => (
                <AptCard key={apartment.id} apartment={apartment} />
        ))}
        </div>
</>
  )
}

export default HomePage