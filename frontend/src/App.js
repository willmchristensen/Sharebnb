import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import SpotBrowser from "./components/SpotBrowser"
import SpotCards from "./components/SpotCards";
import SpotDetails from "./components/SpotDetails"
import CreateNewSpot from "./components/CreateNewSpotForm";
import PostAReviewModal from './components/PostAReviewModal'
import ManageSpots from './components/ManageSpots'

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
              <SpotBrowser />
            </Route>
          </Switch>
        )}  */}
      {/* <SpotCards></SpotCards> */}
      {/* <SpotDetails></SpotDetails> */}
      {/* <CreateNewSpot></CreateNewSpot> */}
      {/* <PostAReviewModal></PostAReviewModal> */}
      <ManageSpots></ManageSpots>
    </>
  );
}

export default App;