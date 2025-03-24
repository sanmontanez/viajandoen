import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  passengerData: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  paymentDetails: {
    id: { type: String, required: true },
    amount: { type: Number, required: true }, // Asegúrate de que el monto esté aquí
    currency: { type: String, required: true }
  },
  flightData: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

export default Transaction;
