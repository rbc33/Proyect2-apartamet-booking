export interface Apartment {
  id: number;
  name: string;
  image: string;
  size: number;
  pricePerDay: number;
  description: string;
  capacity: number;
}

export  interface Booking {
  id: number;
  apartmentId: number;
  in: string;
  out: string;
  guestName: string;
  guests: number;
}
