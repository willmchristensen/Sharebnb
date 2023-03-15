import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { restoreCSRF, csrfFetch } from "./store/csrf";

import Spots from "./components/Spots"
import SpotCards from "./components/SpotCards";
import SpotDetails from "./components/SpotDetails"
import CreateNewSpot from "./components/CreateNewSpotForm";
import PostAReviewModal from './components/PostAReviewModal'
import ManageSpots from './components/ManageSpots'
import DeleteASpot from './components/DeleteSpotModal'
import DeleteReview from "./components/DeleteReviewModal";
import LoginFormModal from "./components/LoginFormModal"
import SignupFormModal from "./components/SignupFormModal"
import ManageReviews from "./components/ManageReviews";
import UpdateReviewModal from "./components/UpdateReviewModal";

// TODO: UPDATE ROUTES
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* <PostAReviewModal></PostAReviewModal> */}
      <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route
              path={[ "/", "/api/spots"]}
              exact
            >
              <Spots />
            </Route>
            <Route
              path={[ "/spots/new"]}
              exact
            >
              <CreateNewSpot></CreateNewSpot> 
            </Route>
            <Route
              path={[ "/spots/current"]}
              exact
            >
              <ManageSpots></ManageSpots>
            </Route>
            <Route
              path={[ "/spots/:spotId"]}
              exact
            >
              <SpotDetails></SpotDetails>
            </Route>
          </Switch>
        )}
        {/* <DeleteASpot></DeleteASpot> */}
        {/* <ManageReviews></ManageReviews>  */}
      
      
      {/* <CreateNewSpot></CreateNewSpot> */}
      {/*<SignupFormModal></SignupFormModal>
      <LoginFormModal></LoginFormModal>
      
      
      <DeleteReview></DeleteReview>*/}
      
     <UpdateReviewModal></UpdateReviewModal> 
    </>
  );
}

export default App;