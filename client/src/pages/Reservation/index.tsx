import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  createReservation,
  deleteReservation as httpDeleteReservation,
  getReservationById,
  updateReservation,
} from "../../http/reservations.http";
import { IReservation } from "../../models/reservation.interface";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { useForm } from "react-hook-form";
import {
  PHONE_MAX_LENGTH,
  PHONE_MIN_LENGTH,
  PHONE_REGEX_PATTERN,
} from "../../constants";
import "./styles.scss";
import InputCell from "../../components/InputCell";
import InputSelectCell from "../../components/InputSelectCell";

const countriesList: { id: number; value: string }[] = [// 
  { id: 1, value: "Israel" },
  { id: 2, value: "UK" },
  { id: 3, value: "USA" },
];

const Reservations = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [reservation, setReservation] = useState<IReservation>(
    {} as IReservation
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IReservation>();

  useEffect(() => {
    if (id) {
      const loadReservation = async () => {
        const result: IReservation | null = await getReservationById(id);
        if (result) {
          setReservation(result);
          reset(result);
        }
      };
      loadReservation();
    }
  }, []);

  const updateDateRange = async (data) => {
    // Need a date management convention
    await setReservation({
      ...reservation,
      checkIn: new Date(data[0]).getTime(),
      checkOut: new Date(data[1]).getTime(),
    });
    reset({
      checkIn: new Date(data[0]).getTime(),
      checkOut: new Date(data[1]).getTime(),
    });
  };

  const save = async (data: IReservation): Promise<void> => {
    try {
      if (id) {
        await updateReservation({ ...reservation, ...data });
      } else {
        await createReservation(data);
      }
      navigate("/");
    } catch (error) {
      console.log(error); // Need an error handler
    }
  };

  const deleteReservation = async (e): Promise<void> => {
    e.preventDefault();
    try {
      if (reservation && id) {
        await httpDeleteReservation(reservation.id);
      }
      navigate("/");
    } catch (error) {
      console.log(error); // Need an error handler
    }
  };

  return (
    <div className="container">
      <h1>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <i className="zmdi zmdi-arrow-left"></i>
        </Link>
        RESERVATION
      </h1>
      <form onSubmit={handleSubmit((data) => save(data))}>
        <div className="actions-row">
          <div>
            {reservation?.firstName} {reservation?.lastName}
          </div>
          <div>
            <button className="button gray-button" onClick={deleteReservation}>
              DELETE
            </button>
            <button type="submit" className="button green-button">
              SAVE
            </button>
          </div>
        </div>

        <div className="reservation-form">
          <div className="basic-con">
            <h1>Basic</h1>
            <div className="inputs-row">
              <InputCell
                label="Assigned Room"
                fieldName="assignedRoom"
                register={register}
                errors={errors}
                validation={{ required: true }}
              ></InputCell>
              <div className="input-cell">
                <label htmlFor="dates">Dates</label>
                <DatePicker // Missing required validation
                  name="dates"
                  selectsRange={true}
                  startDate={reservation.checkIn || null}
                  endDate={reservation.checkOut || null}
                  onChange={updateDateRange}
                  isClearable={true}
                />
              </div>
              <InputCell
                label="Booking Source"
                fieldName="bookingSource"
                register={register}
                errors={errors}
                validation={{ required: true }}
              ></InputCell>
            </div>
          </div>

          <div className="booker-con">
            <h1>Booker</h1>
            <div className="inputs-row">
            <InputCell
                label="First Name"
                fieldName="firstName"
                register={register}
                errors={errors}
                validation={{ required: true }}
              ></InputCell>
              <InputCell
                label="Last Name"
                fieldName="lastName"
                register={register}
                errors={errors}
                validation={{ required: true }}
              ></InputCell>
              <InputCell
                label="Email"
                fieldName="email"
                inputType="email"
                register={register}
                errors={errors}
                validation={{ required: true }}
              ></InputCell>
              <div className="input-cell">{/* "<InputCell>" Currently does not support some error types*/}
                <label htmlFor="phone">Phone</label>
                <input
                  {...register("phone", {
                    required: true,
                    minLength: PHONE_MIN_LENGTH,
                    maxLength: PHONE_MAX_LENGTH,
                    pattern: PHONE_REGEX_PATTERN,
                  })} // TODO This is just an example (does not support an overseas number)
                  type="text"
                  name="phone"
                />
                {errors.phone?.type === "required" && <p>Phone is required.</p>}
                {errors.phone?.type === "minLength" && (
                  <p>Enter {PHONE_MIN_LENGTH} digits min.</p>
                )}
                {errors.phone?.type === "maxLength" && (
                  <p>Enter {PHONE_MAX_LENGTH} digits max.</p>
                )}
                {errors.phone?.type === "pattern" && (
                  <p>This field can only contain numbers.</p>
                )}
              </div>
              <InputSelectCell
                label="Country"
                fieldName="country"
                selectOptions={countriesList}
                register={register}
                errors={errors}
                validation={{ required: true }}
              ></InputSelectCell>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Reservations;
