export interface IReservation {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    assignedRoom: string;
    checkIn: number;
    checkOut: number;
    bookingSource: string;
}