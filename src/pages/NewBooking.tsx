import { useEffect, useState } from "react";
import { type DateRange } from "react-day-picker";
import toast from "react-hot-toast";
import AptCard from "../components/AptCard";
import BookingForm from "../components/BookingForm";
import { type Apartment, type Booking } from "../types/types";

export const BASE_URL = "/api";

const NewBooking = () => {
  const [apartaments, setApartaments] = useState<Apartment[]>([]);

  const now = new Date();
  const tomorrowDate = new Date(now);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);

  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState<number>(1);
  const [guestName, setGuestName] = useState<string>("");
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  useEffect(() => {
    getAvailableApartments(dateRange?.from, dateRange?.to, guests).then(
      (availableApartments) => {
        setApartaments(availableApartments);
      }
    );
  }, [dateRange, guests, hasChanged]);

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
            in: dateRange.from,
            out: dateRange.to!,
            guestName: guestName,
            guests: guests,
          }),
        });
        if (!res.ok) {
          throw new Error("Error creating booking");
        }
        setHasChanged(!hasChanged);
        setGuestName("");
        toast.success("Booking created successfully!", {
          position: "top-right",
        });

      } catch (err) {
        console.error("booking error", err);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 pb-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-primary">Book Your Stay</h1>

      <BookingForm
        dateRange={dateRange}
        setDateRange={setDateRange}
        guests={guests}
        setGuests={setGuests}
        guestName={guestName}
        setGuestName={setGuestName}
      />

      <div className="divider my-10"></div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Available Apartments</h2>
        <div className="badge badge-primary badge-lg">{apartaments.length} available</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apartaments.map((apartment) => (
          <AptCard key={apartment.id} apartment={apartment}>
            <button
              className="btn btn-primary w-full"
              onClick={() => handleClick(apartment)}
            >
              Book now
            </button>
          </AptCard>
        ))}
      </div>
    </div>
  );
};

export default NewBooking;



async function getAvailableApartments(
  checkInDate: Date | undefined,
  checkOutDate: Date | undefined,
  guests: number = 1
) {
  try {
    // Get all apartments and bookings
    const resApt = await fetch(BASE_URL + "/apartments");
    const allApartments = await resApt.json();
    const resBook = await fetch(BASE_URL + "/bookings");
    const allBookings = await resBook.json();

    if (!checkInDate || !checkOutDate) {
      return allApartments as Apartment[];
    }
    // Filter available apartments
    const availableApartments = allApartments
      .filter((apartment: Apartment) => {
        // Get bookings for this specific apartment
        const apartmentBookings: Booking[] = allBookings.filter(
          (booking: Booking) => booking.apartmentId === apartment.id
        );
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
  checkIn: Date,
  checkOut: Date,
  apartmentBookings: Booking[]
) {
  return !apartmentBookings.some((booking) => {
    const bookingIn = new Date(booking.in);
    const bookingOut = new Date(booking.out);

    // Check for date overlap
    return checkIn < bookingOut && checkOut > bookingIn;
  });
}
