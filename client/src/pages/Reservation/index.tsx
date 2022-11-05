import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createReservation, deleteReservation, getReservationById, updateReservation } from "../../http/reservations.http";
import { IReservation } from "../../models/reservation.interface";
import DatePicker from "react-datepicker";
import { NEW_ROUTE } from "../../constants";
import "./styles.scss";

const Reservations = () => {
  const { id } = useParams();
  const [data, setData] = useState<IReservation | null>({} as IReservation);

  useEffect(() => {
    if (!isNew()) {
      const fetchWearables = async () => {
        const result: IReservation | null = await getReservationById(id);
        setData(result);
      };
      fetchWearables();
    }

  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...(data || ({} as IReservation)), [name]: value });
  };

  const save = async (e): Promise<void> => {
    
    e.preventDefault();
    if (data) {
      if (isNew()) {
        await createReservation(data);
      } else {
        await updateReservation(data);
      }
    }
  }

  const deleteItem = async (e): Promise<void> => {
    e.preventDefault();
    if (data) {
      if (!isNew()) {
        await deleteReservation(data.id);
      }
      setData({} as IReservation);
    }
  }

  const isNew = (): boolean => {
    return id === NEW_ROUTE;
  }

  return (
    <div className="container">
      <h1>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <i className="zmdi zmdi-arrow-left"></i>
        </Link>
        RESERVATION
      </h1>
      <form onSubmit={save}>
        <div className="actions-row">
          <div>
            {data?.firstName} {data?.lastName}
          </div>
          <div>
            <button className="button gray-button" onClick={deleteItem}>DELETE</button>
            <button type="submit" className="button green-button">SAVE</button>
          </div>
        </div>

        <div className="reservation-form">
          <div className="basic-con">
            <h1>Basic</h1>
            <div className="inputs-row">
              <div className="input-cell">
                <label htmlFor="assignedRoom">Assigned Room</label>
                <input
                  type="text"
                  name="assignedRoom"
                  value={data?.assignedRoom || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-cell">
                <label htmlFor="dates">Dates</label>
                {/* <DatePicker
                selectsRange={true}
                startDate={new Date()}
                endDate={new Date()}
                onChange={(update) => {
                  console.log(update);
                }}
                isClearable={true}
              /> */}
                <input type="date" name="dates" />
              </div>
              <div className="input-cell">
                <label htmlFor="bookingSource">Booking Source</label>
                <input
                  type="text"
                  name="bookingSource"
                  value={data?.bookingSource || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="booker-con">
            <h1>Booker</h1>
            <div className="inputs-row">
              <div className="input-cell">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={data?.firstName || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-cell">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={data?.lastName || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-cell">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={data?.email || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-cell">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={data?.phone || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-cell">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  name="country"
                  value={data?.country || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Reservations;
