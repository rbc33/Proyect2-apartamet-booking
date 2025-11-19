import { useEffect, useState } from "react";
import { type Apartment, type Booking } from "./types/types";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export const BASE_URL = "http://158.179.219.166:5555"

function formatLocalInputDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

async function getAvailableApartments(
  checkInDate: string,
  checkOutDate: string
) {
  try {
    // Get all apartments and bookings
    const [allApartments, allBookings] = await Promise.all([
      fetch(BASE_URL+ "/apartments").then((r) => r.json()),
      fetch(BASE_URL+ "/bookings").then((r) => r.json()),
    ]);

    // Filter available apartments
    const availableApartments = allApartments.filter((apartment: Apartment) => {
      // Get bookings for this specific apartment
      const apartmentBookings: Booking[] = allBookings.filter(
        (booking: Booking) => booking.apartmentId === apartment.id
      );

      // Check availability
      return checkAvailability(checkInDate, checkOutDate, apartmentBookings);
    });

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

const Home = () => {
  const [apartaments, setApartaments] = useState<Apartment[]>([]);
  const [bookings] = useState<unknown[]>([]);

  const now = new Date();
  const today = formatLocalInputDate(now);
  const tomorrowDate = new Date(now);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = formatLocalInputDate(tomorrowDate);

  const [checkIn, setCheckIn] = useState<string>(today);
  const [checkOut, setCheckOut] = useState<string>(tomorrow);
  const [guests, setGuests] = useState<number>(1);
  const [guestName, setGuestName] = useState<string>("");
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  useEffect(() => {
    getAvailableApartments(checkIn, checkOut).then((availableApartments) => {
      setApartaments(availableApartments);
    });
  }, [checkIn, checkOut, hasChanged ]);

  const handleClick = async (apartment: Apartment) => {
    if (guestName === "") {
      toast.error("Please enter a guest name");
      return;
    }
    if (guests < 1) {
      toast.error("Please enter a valid number of guests");
      return;
    }
    if (guests > apartment.capacity) {
      toast.error("number of guests exceeds apartment capacity");
      return;
    } else {

        try {
            const res = await fetch(BASE_URL + "/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    apartmentId: apartment.id,
                    in: checkIn,
                    out: checkOut,
                    guestName: guestName,
                    guests: guests,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error("Error creating booking");
            }
            toast.success("Booking created successfully!");
            
            console.log("booking created", data);
        } catch (err) {
            console.error("booking error", err);
        }
        setHasChanged(!hasChanged);
    }
  };

  return (
    <div>
      {checkIn} - {checkOut}
      <div>
        Disponibles: {apartaments.length} — Reservas: {bookings.length}
      </div>
      <label htmlFor="checkIn">Check in:</label>
      <input
        type="date"
        id="checkIn"
        value={checkIn}
        name="checkIn"
        onChange={(e) => setCheckIn(e.target.value)}
      />
      <label htmlFor="checkOut">Check out:</label>
      <input
        type="date"
        id="checkOut"
        value={checkOut}
        name="checkOut"
        onChange={(e) => {if (e.target.value < checkIn) {
          toast.error("Check out date must be after check in date");
          return;
        } setCheckOut(e.target.value)}}
      />
      <label htmlFor="guests">Guests:</label>
      <input
        type="number"
        id="guests"
        value={guests}
        name="guests"
        min={1}
        max={10}
        onChange={(e) => setGuests(Number(e.target.value))}
      />
      <label htmlFor="guestName">Guest Name:</label>
      <input
        type="text"
        id="guestName"
        value={guestName}
        name="guestName"
        onChange={(e) => setGuestName(e.target.value)}
      />
      {apartaments.map((apartment) => (
          <div className="border-2 border-slate-600 mt-5 flex" key={apartment.id}>
            <img src={apartment.image} alt={apartment.name} />
            <div className="p-5">
            <Link to={`/apartment/${apartment.id}`} ><p className="text-3xl">{apartment.name} - {apartment.pricePerDay}€/day</p></Link>
            <p className="text-2xl">Size: {apartment.size} m² - Capacity: {apartment.capacity} guests</p>
        <p className="text-2xl">{apartment.description}</p>
        <button className="mt-5 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleClick(apartment)}> Book now </button>
        </div></div>))}
    </div>
  );
};

export default Home;
