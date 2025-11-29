import { useEffect, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { Link, useParams } from 'react-router-dom'
import AptCard from '../components/AptCard'
import DatePicker from '../components/DatePicker'
import { type Apartment, type Booking } from '../types/types'
import { BASE_URL, formatLocalInputDate } from './NewBooking'
import { toast } from 'react-hot-toast'

interface ApartmentDet extends Apartment{
    bookings: Booking[]

}
const ApartmentDet = () => {
    // TODO: crate context for dates instead new state and date pickers here
    // const [checkIn, setCheckIn] = useState<Date | undefined>(new Date());
    // const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
   const {id} = useParams()
   const [apartment, setApartment] = useState<ApartmentDet| undefined>()
   const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState<number>(1);
  const [guestName, setGuestName] = useState<string>("");
  const [hasChanged, setHasChanged] = useState<boolean>(false);

   useEffect(() => {
   const fetchApt = async() => {

       const res = await fetch(BASE_URL+`/apartments/${id}?_embed=bookings`)
       const data = await res.json()
       console.log(data)
       setApartment(data)
   }

    fetchApt()
    
   }, [id, apartment?.bookings.length, hasChanged])
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
   const handleClick = async (apartment: Apartment) => {
    if (guestName === "") {
      toast.error("Please enter a guest name", { position: "top-right" });
      return;
    }
    if (guests < 1) {
      toast.error("Please enter a valid number of guests", {
        position: "top-right",
      });
      return;
    } else {
      try {
        if (!dateRange?.from || !dateRange.to) {
          toast.error("Please select a valid date range", {
            position: "top-right",
          });
          return;
        }
        const res = await fetch(BASE_URL + "/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            apartmentId: apartment.id,
            in: formatLocalInputDate(dateRange.from),
            out: formatLocalInputDate(dateRange.to!),
            guestName: guestName,
            guests: guests,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error("Error creating booking");
        }
        setHasChanged(!hasChanged);
        setGuestName("");
        toast.success("Booking created successfully!", {
          position: "top-right",
        });

        console.log("booking created", data);
      } catch (err) {
        console.error("booking error", err);
      }
    }
  };
    return (
        <>
            {apartment && (
                <div className='flex gap-5'>
                    <div>
                       <AptCard apartment={apartment}/> 
                    <div className="flex">
                    <button className='btn btn-primary mt-5' onClick={() =>handleClick(apartment)}>Book now</button>
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
                                    <button className='btn btn-secondary mt-2 justify-self-start' onClick={() => handleDelete(booking.id)}>Delete</button>
                                    </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                   <div className="flex flex-col items-start gap-2 my-4">
      <div className="flex flex-col items-start gap-2 my-4">
      
      <label htmlFor="guests">Guests:</label>
      <input
              className="input mx-2"

        type="number"
        id="guests"
        value={guests}
        name="guests"
        min={1}
        max={10}
        onChange={(e) => {
            if (Number(e.target.value) > apartment.capacity) {
                toast.error(`Maximum guests for this apartment is ${apartment.capacity}`);
            } else {
          setGuests(Number(e.target.value))}}}
      />
      <label htmlFor="guestName">Guest Name:</label>
      <input
              className="input mx-2"

        type="text"
        id="guestName"
        value={guestName}
        name="guestName"
        onChange={(e) => setGuestName(e.target.value)}
      />
      </div>
          <div className="flex flex-col">

      <label className="text-2xl">{(dateRange?.from)? "Selecet Check out:" : "Select Check in:"}</label>
      <DatePicker
      selectedDate={dateRange}
      onDateChange={(dateRange) =>setDateRange(dateRange!)}
      disabled={apartment.bookings.map(booking => ({ from: new Date(booking.in), to: new Date(booking.out)}))}
      
  />
      <button className="btn btn-primary mt-5 text-white px-4 py-2 rounded justify-self-center" onClick={() => setDateRange(undefined)}> Clear dates </button>
</div>
      </div>
                </div>
            )}
        </>
    )
}

export default ApartmentDet