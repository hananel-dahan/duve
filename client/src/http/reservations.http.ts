import { IReservation } from "../models/reservation.interface";
import { BASE_URL, RESERVATIONS_API } from "../constants";

export async function getAllReservations(): Promise<IReservation[]> {
  try {
    let res = await fetch(`${BASE_URL}/${RESERVATIONS_API}`, { method: "GET" });
    return await res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getReservationById(id: string): Promise<IReservation | null> {
  try {
    let res = await fetch(`${BASE_URL}/${RESERVATIONS_API}/${id}`, { method: "GET" });
    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createReservation(reservation: IReservation): Promise<IReservation | null> {
  try {
    let res = await fetch(`${BASE_URL}/${RESERVATIONS_API}`,
      { 
        method: "POST", 
        body: JSON.stringify(reservation),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateReservation(reservation: IReservation): Promise<IReservation | null> {
  try {
    let res = await fetch(`${BASE_URL}/${RESERVATIONS_API}/${reservation.id}`,
      {
        method: "PUT",
        body: JSON.stringify(reservation),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteReservation(id: string): Promise<IReservation | null> {
  try {
    let res = await fetch(`${BASE_URL}/${RESERVATIONS_API}/${id}`,
      {
        method: "DELETE",
      });
    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

