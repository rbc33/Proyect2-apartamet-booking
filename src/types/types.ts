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
  in: Date;
  out: Date;
  guestName: string;
  guests: number;
}
