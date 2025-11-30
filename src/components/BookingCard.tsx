import type { Booking } from "../types/types";

interface BookingCardProps {
  booking: Booking;
  handleDelete: (bookingId: number) => void;
}

const BookingCard = ({ booking, handleDelete }: BookingCardProps) => {
  return (
    <div
      key={booking.id}
      className="flex flex-col items-start justify-self-start"
    >
      <div className=" card border-2 border-slate-600 p-3 mt-2  w-[400px]">
        <p className="text-xl">Guest Name: {booking.guestName}</p>
        <p className="text-xl">Guests: {booking.guests}</p>
        <p className="text-xl">
          From: {new Date(booking.in).toLocaleDateString("en-GB")}
        </p>
        <p className="text-xl">
          To: {new Date(booking.out).toLocaleDateString("en-GB")}
        </p>
        <button
          className="btn btn-secondary mt-2 justify-self-start"
          onClick={() => handleDelete(booking.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookingCard;
