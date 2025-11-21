import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BASE_URL } from './MakeBooking'
import {type Apartment, type Booking } from '../types/types'

const ApartmentDet = () => {
   const {id} = useParams()
   const [apartment, setApartment] = useState<Apartment| undefined>()
   const [bookings, setBookings] = useState<Booking[]|undefined>()

   useEffect(() => {
   const fetchApt = async() => {
       const response = await fetch(BASE_URL+`/apartments/${id}`)
       const data = await response.json()
       console.log(data)
       setApartment(data)
   }
   const fetchBooking = async() => {
    const response = await fetch(BASE_URL+`/bookings?apartmentId=${id}`)
    const data = await response.json()
    console.log(data)
    setBookings(data)
   }
    fetchApt()
    fetchBooking()
    
   }, [id])
   const handleDelete = async(bookingId:number) => {
    try {
        const response = await fetch(BASE_URL+`/bookings/${bookingId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setBookings((prevBookings) => prevBookings?.filter((booking) => booking.id !== bookingId));
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
                    <div><div className="card border-2 border-slate-600 mt-5 flex" key={apartment.id}>
                        <figure>
                        <img src={apartment.image} alt={apartment.name} />
                        </figure>
                        <div className="card-body p-5 w-[500px]">
                            <p className="text-3xl">{apartment.name} - {apartment.pricePerDay}€/day</p>
                            <p className="text-2xl">Size: {apartment.size} m² - Capacity: {apartment.capacity} guests</p>
                            <p className="text-2xl">{apartment.description}</p>
                        </div>
                    </div>
                    <div className="flex">
                    <button className='btn btn-primary mt-5'><Link to="/">Back Home</Link></button>
                    <button className='btn btn-secondary mt-5 ml-5'><Link to={`/apartment/${apartment.id}/edit`}>Edit Apartment</Link></button>
                    </div>
                    </div>

                    <div>
                        {bookings && (
                            <div>
                                <h2 className="text-2xl mt-5">Bookings:</h2>
                                {bookings.length === 0 && <p>No bookings for this apartment.</p>}
                                {bookings.map((booking) => (
                                    <div className='flex flex-col items-start justify-self-start'>
                                    <div key={booking.id} className=" card border-2 border-slate-600 p-3 mt-2  w-[400px]">
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