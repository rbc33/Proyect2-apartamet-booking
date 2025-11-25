import { useEffect, useState } from "react";
import { type Apartment, type Booking } from "../types/types";
import toast from "react-hot-toast";
import AptCard from "../components/AptCard";
import DatePicker from '../components/DatePicker';

export const BASE_URL = "/api"


const NewBooking = () => {
  const [apartaments, setApartaments] = useState<Apartment[]>([]);

  const now = new Date();
  // const today = formatLocalInputDate(now);
  const tomorrowDate = new Date(now);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  // const tomorrow = formatLocalInputDate(tomorrowDate);

  const [checkIn, setCheckIn] = useState<Date>(now);
  const [checkOut, setCheckOut] = useState<Date>(tomorrowDate);
  const [guests, setGuests] = useState<number>(1);
  const [guestName, setGuestName] = useState<string>("");
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  useEffect(() => {
    getAvailableApartments(formatLocalInputDate(checkIn), formatLocalInputDate(checkOut), guests).then((availableApartments) => {
      setApartaments(availableApartments);
    });
  }, [checkIn, checkOut, guests, hasChanged ]);

  const handleClick = async (apartment: Apartment) => {
    if (guestName === "") {
      toast.error("Please enter a guest name",{position: "top-right"});
      return;
    }
    if (guests < 1) {
      toast.error("Please enter a valid number of guests",{position: "top-right"});
      return;
    
    } else {

        try {
            const res = await fetch(BASE_URL + "/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    apartmentId: apartment.id,
                    in: formatLocalInputDate(checkIn),
                    out: formatLocalInputDate(checkOut),
                    guestName: guestName,
                    guests: guests,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error("Error creating booking");
            }
            setHasChanged(!hasChanged);
            toast.success("Booking created successfully!",{position: "top-right"});
            
            console.log("booking created", data);
        } catch (err) {
            console.error("booking error", err);
        }
    }
  };
  const handleChechOut = (date: Date) => {
  if (date <= checkIn) {
    toast.error("Check out date must be after check in date",{position: "top-right"});
    return;
  } 
  setCheckOut(date);
  }


  return (
    <div>
      <p className="text-3xl mt-5">{apartaments.length} Apartments available.</p>
      <br/>
      
      <div className="flex gap-40">
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
          setGuests(Number(e.target.value))}}
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

      <label className="text-2xl">Check in:</label>
      <DatePicker
      selectedDate={checkIn}
      onDateChange={(date) =>setCheckIn(date!)}
      
  /></div>
    <div className="flex flex-col">
      <label className="text-2xl">Check out:</label>
      <DatePicker
      selectedDate={checkOut}
      onDateChange={(date) =>handleChechOut(date!)} />
      </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
      {apartaments.map((apartment) => (
         <AptCard key={apartment.id} apartment={apartment}>
        <button className="mt-5 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleClick(apartment)}> Book now </button>
        </AptCard>))}
        </div>
    </div>
  );
};

export default NewBooking;


function formatLocalInputDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

async function getAvailableApartments(
  checkInDate: string,
  checkOutDate: string,
  guests: number = 1
) {
  try {
    // Get all apartments and bookings
    const resApt = await fetch(BASE_URL+ "/apartments")
    const allApartments = await resApt.json();
    console.log(allApartments)
    const resBook = await fetch(BASE_URL+ "/bookings")
    const allBookings = await resBook.json();
    console.log(allBookings)
    

    // Filter available apartments
    const availableApartments = allApartments.filter((apartment: Apartment) => {
      // Get bookings for this specific apartment
      const apartmentBookings: Booking[] = allBookings
      .filter(
        (booking: Booking) => booking.apartmentId === apartment.id
      )
      // Check availability
      return checkAvailability(checkInDate, checkOutDate, apartmentBookings);
    })
    // Filter by capacity
    .filter((apartment: Apartment) => apartment.capacity >= guests);

    return availableApartments as Apartment[];
  } catch (error) {
    console.error("Error fetching available apartments:", error);
    return [] as Apartment[];
  }
}

function checkAvailability(
  checkIn: string,
  checkOut: string,
  apartmentBookings: Booking[]
) {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  return !apartmentBookings.some((booking) => {
    const bookingIn = new Date(booking.in);
    const bookingOut = new Date(booking.out);

    // Check for date overlap
    return checkInDate < bookingOut && checkOutDate > bookingIn;
  });
}
