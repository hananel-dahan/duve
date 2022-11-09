import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReservationsTable from "../../components/ReservationsTable";
import { getAllReservations } from "../../http/reservations.http";
import { IReservation } from "../../models/reservation.interface";
import "./styles.scss";

const ReservationsList = () => {
  const [data, setData] = useState<IReservation[]>([]);

  useEffect(() => {
    const fetchWearables = async () => {
      const result: IReservation[] = await getAllReservations();
      setData(result);
    };
    fetchWearables();
  }, []);

  return (
    <div className="container">
      <h1>RESERVATIONS</h1>
      <div className="actions-row">
        <Link to="/new" className="align-right" style={{ textDecoration: "none", color: "" }}>
          <button className="button green-button">Add Reservation</button>
        </Link>
      </div>
      <ReservationsTable />
    </div>
  );
};
export default ReservationsList;
