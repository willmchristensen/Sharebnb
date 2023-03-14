import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

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

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      
      {/* <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route
              path={[ "/", "/api/spots"]}
              exact
            >
              <Spots />
              
            </Route>
          </Switch>
        )} */}
      {/* <ManageSpots></ManageSpots> */}
      <SpotDetails></SpotDetails>
      {/* <CreateNewSpot></CreateNewSpot> */}
      {/*<SignupFormModal></SignupFormModal>
      <LoginFormModal></LoginFormModal>
      <PostAReviewModal></PostAReviewModal>
      <DeleteASpot></DeleteASpot>
      <DeleteReview></DeleteReview>
      <ManageReviews></ManageReviews> */}
     <UpdateReviewModal></UpdateReviewModal>
    </>
  );
}

export default App;