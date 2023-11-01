import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserBookings } from '../../store/bookings'; // Import loadUserBookings
import BookingCard from './BookingCard';

const ManageBookings = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const userBookings = useSelector(state => state.bookings.user); 
  const userBookingsArray = Object.values(userBookings);
  const today = new Date();
  let futureBookings = userBookingsArray.filter(b => {
    let start = new Date(b.startDate);
    return start > today;
  });
  useEffect(() => {
    dispatch(loadUserBookings()); 
  }, [dispatch, sessionUser]);
  return (
    <main>
      <div className="manage-wrapper">
        <nav className="spot-cards-section">
          <div className="spot-cards-section-header">
            <h3>Manage Your Bookings</h3>
          </div>
          {futureBookings.length ? futureBookings.map(booking => (
            <BookingCard booking={booking} key={booking.id} />
          )) : 
          <h1>Oops, there appears to be nothing here!</h1>
          }
        </nav>
      </div>
    </main>
  );
};

export default ManageBookings;
