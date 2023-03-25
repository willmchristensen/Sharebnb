import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { restoreCSRF, csrfFetch } from "./store/csrf";

import LoginFormModal from "./components/LoginFormModal"
import SignupFormModal from "./components/SignupFormModal"
import Spots from "./components/Spots"
import SpotCards from "./components/SpotCards";
import SpotDetails from "./components/SpotDetails"
import CreateNewSpot from "./components/CreateNewSpotForm";
import PostAReviewModal from './components/PostAReviewModal'
import UpdateSpot from './components/UpdateSpotForm'
import ManageSpots from './components/ManageSpots'
import ManageReviews from "./components/ManageReviews";
import DeleteASpot from './components/DeleteSpotModal'
import DeleteReview from "./components/DeleteReviewModal";
import UpdateReviewModal from "./components/UpdateReviewModal";
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