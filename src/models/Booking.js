// models/Booking.js
import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  orderId: String,
  passengerData: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
  },
  flightData: [Object],
  paymentDetails: {
    amount: Number,
    currency: String,
    transactionId: String,
  },
  bookingDetails: {
    id: String,
    bookingReference: String,
    status: String,
  },
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);