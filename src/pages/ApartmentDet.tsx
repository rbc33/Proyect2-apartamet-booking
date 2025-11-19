import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from './Home'
import {type Apartment, type Booking } from './types/types'

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
    return (
        <>
            {apartment && (
                <>
                    <div className="border-2 border-slate-600 mt-5 flex" key={apartment.id}>
                        <img src={apartment.image} alt={apartment.name} />
                        <div className="p-5">
                            <p className="text-3xl">{apartment.name} - {apartment.pricePerDay}€/day</p>
                            <p className="text-2xl">Size: {apartment.size} m² - Capacity: {apartment.capacity} guests</p>
                            <p className="text-2xl">{apartment.description}</p>
                        </div>
                    </div>

                    <div>
                        {bookings && (
                            <div>
                                <h2 className="text-2xl mt-5">Bookings:</h2>
                                {bookings.length === 0 && <p>No bookings for this apartment.</p>}
                                {bookings.map((booking) => (
                                    <div key={booking.id} className="border-2 border-slate-400 p-3 my-2">
                                        <p className="text-xl">Guest Name: {booking.guestName}</p>
                                        <p className="text-xl">Guests: {booking.guests}</p>
                                        <p className="text-xl">From: {booking.in} To: {booking.out}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    )
}

export default ApartmentDet