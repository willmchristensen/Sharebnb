import './BookingCard.css'
import BookingImage from './BookingImage';
import ManageButtons from '../../ManageButtons';

function BookingCard({ booking }) {
    return (
        <div className="booking-card">
            <div className="booking-info-container">
                <h3 className="booking-info">
                    Start:
                </h3>
                <span className="booking-info-dates"> {booking.startDate}</span>
            </div>
            <div className="booking-info-container">
                <h3 className="booking-info">
                    End:
                </h3>
                <span className="booking-info-dates"> {booking.endDate}</span>
            </div>
            <BookingImage image={booking.Spot.previewImage} />
            <div className="manage-buttons-container">
               <ManageButtons booking={booking} />
            </div>
        </div>
    )
}

export default BookingCard;