import React from "react";
import { Route, Routes } from "react-router-dom";
import ReservationsList from "./pages/ReservationsList";
import Reservation from "./pages/Reservation";
import { NEW_ROUTE } from "./constants";
import "./App.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ReservationsList/>} />
        <Route path="/:id" element={<Reservation/>} />
        <Route path={`/${NEW_ROUTE}`} element={<Reservation/>} />
      </Routes>
    </> 
  );
}

export default App;
