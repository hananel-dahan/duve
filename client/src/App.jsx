import React from "react";
import { Route, Switch } from "react-router-dom";
import Reservations from "./pages/Reservations";
import Reservation from "./pages/Reservation";
import { NEW_ROUTE } from "./constants";
import "./App.scss";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Reservations} />
        <Route exact path="/:id" component={Reservation} />
        <Route exact path={`/${NEW_ROUTE}`} component={Reservation} />
      </Switch>
    </>
  );
}

export default App;
