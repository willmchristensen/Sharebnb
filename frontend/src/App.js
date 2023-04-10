import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots"
import SpotDetails from "./components/SpotDetails"
import CreateNewSpot from "./components/CreateNewSpotForm";
import ManageSpots from './components/ManageSpots'
import ManageReviews from "./components/ManageReviews";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    <>
      <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route
              path={[ "/spots/new"]}
              exact
            >
              <CreateNewSpot></CreateNewSpot> 
            </Route>
            <Route
              path={[ "/reviews/current"]}
              exact
            >
              <ManageReviews></ManageReviews>
            </Route>
            <Route
              path={[ "/spots/current"]}
              exact
            >
              <ManageSpots></ManageSpots>
            </Route>
            <Route
              path={[ "/spots/:spotId"]}
            >
              <SpotDetails></SpotDetails>
            </Route>
            <Route
              path={[ "/", "/spots"]}
              exact
            >
              <Spots />
            </Route>
          </Switch>
        )}
    </>
  );
}

export default App;