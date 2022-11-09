import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllReservations } from "../../http/reservations.http";
import { IReservation } from "../../models/reservation.interface";
import "./styles.scss";

const ReservationsTable = () => {
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
      <div className="table-row">
        <div className="table-header-cell">FIRST NAME</div>
        <div className="table-header-cell">LAST NAME</div>
        <div className="table-header-cell">EMAIL</div>
        <div className="table-header-cell">PHONE</div>
        <div className="table-header-cell">ROOM</div>
        <div className="table-header-cell">CHECK-IN</div>
        <div className="table-header-cell">CHECK-OUT</div>
      </div>
      {data.length &&
        data.map((item) => (
          <Link
            to={"/" + item.id}
            key={item.id}
            style={{ textDecoration: "none" }}
          >
            <div className="table-row" key={item.id}>
              <div className="table-cell">{item.firstName}</div>
              <div className="table-cell">{item.lastName}</div>
              <div className="table-cell">{item.email}</div>
              <div className="table-cell">{item.phone}</div>
              <div className="table-cell">{item.assignedRoom}</div>
              <div className="table-cell">
                {
                  new Date(item.checkIn).toDateString() // Lazy date format
                }
              </div>
              <div className="table-cell">
                {
                  new Date(item.checkOut).toDateString() // Lazy date format
                }
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};
export default ReservationsTable;
