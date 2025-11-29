import type { DateRange } from 'react-day-picker';
import DatePicker from './DatePicker';

interface BookingFormProps {
  dateRange: DateRange | undefined;
  setDateRange: (dateRange: DateRange | undefined) => void;
  guests: number;
  setGuests: (guests: number) => void;
  guestName: string;
  setGuestName: (guestName: string) => void;
}

const BookingForm = ({
    dateRange,
    setDateRange,
    guests,
    setGuests,
    guestName,
    setGuestName,
}: BookingFormProps) => {
  
  return (
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
      <button className="mt-5 bg-blue-500 text-white px-4 py-2 rounded justify-self-center" onClick={() => setDateRange(undefined)}> Clear dates </button>
      </div>
          <div className="flex flex-col">

      <label className="text-2xl">{(dateRange?.from)? "Selecet Check out:" : "Select Check in:"}</label>
      <DatePicker
      selectedDate={dateRange}
      onDateChange={(dateRange) =>setDateRange(dateRange!)}
      
  />
</div>
      </div>
  )
}

export default BookingForm