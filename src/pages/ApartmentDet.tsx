import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BASE_URL } from './NewBooking'
import {type Apartment, type Booking } from '../types/types'
import AptCard from '../components/AptCard'

interface ApartmentDet extends Apartment{
    bookings: Booking[]

}
const ApartmentDet = () => {
   const {id} = useParams()
   const [apartment, setApartment] = useState<ApartmentDet| undefined>()

   useEffect(() => {
   const fetchApt = async() => {

       const res = await fetch(BASE_URL+`/apartments/${id}?_embed=bookings`)
       const data = await res.json()
       console.log(data)
       setApartment(data)
   }

    fetchApt()
    
   }, [id, apartment?.bookings.length])
   const handleDelete = async(bookingId:number) => {
    try {
        const response = await fetch(BASE_URL+`/bookings/${bookingId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setApartment((currentApartment) => {
                if (!currentApartment) {
                  return undefined;}
                return {
                  ...currentApartment,
                  bookings: currentApartment.bookings.filter((booking) => booking.id !== bookingId),
                };
              });
        } else {
            console.error('Failed to delete booking');
        }
    } catch (error) {
        console.error('Error deleting booking:', error);
    }
   }
    return (
        <>
            {apartment && (
                <div className='flex gap-5'>
                    <div>
                       <AptCard apartment={apartment}/> 
                    <div className="flex">
                    <button className='btn btn-primary mt-5'><Link to="/">Back Home</Link></button>
                    <button className='btn btn-secondary mt-5 ml-5'><Link to={`/apartment/${apartment.id}/edit`}>Edit Apartment</Link></button>
                    </div>
                    </div>

                    <div>
                        {apartment.bookings && (
                            <div>
                                <h2 className="text-2xl mt-5">Bookings:</h2>
                                {apartment.bookings.length === 0 && <p>No bookings for this apartment.</p>}
                                {apartment.bookings.map((booking) => (
                                    <div key={booking.id} className='flex flex-col items-start justify-self-start'>
                                    <div className=" card border-2 border-slate-600 p-3 mt-2  w-[400px]">
                                        <p className="text-xl">Guest Name: {booking.guestName}</p>
                                        <p className="text-xl">Guests: {booking.guests}</p>
                                        <p className="text-xl">From: {booking.in} </p><p className="text-xl">To: {booking.out}</p>
                                    <button className='btn btn-primary mt-2 justify-self-start' onClick={() => handleDelete(booking.id)}>Delete</button>
                                    </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default ApartmentDet