import { api } from '../api/client';

export default function TripPanel({ tripId }) {
  const endTrip = async () => {
    try {
      const tripRes = await api.post(`/trips/${tripId}/end`, {
        endLat: 12.9352,
        endLng: 77.6245,
      });

      await api.post('/payments', {
        tripId,
        amount: tripRes.data.fare,
        paymentMethod: 'CARD',
      });

      alert('Trip completed and payment successful');
    } catch (err) {
      alert('Failed to end trip or process payment');
      console.error(err);
    }
  };

  if (!tripId) {
    return <div><b>No active trip</b></div>;
  }

  return (
    <div>
      <h3>Trip Panel</h3>
      <div><b>Trip ID:</b> {tripId}</div>
      <button onClick={endTrip}>End Trip</button>
    </div>
  );
}
