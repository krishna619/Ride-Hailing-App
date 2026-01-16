import { api } from '../api/client';

export default function CreateRide({ onRideCreated }) {
  const createRide = async () => {
    const res = await api.post('/rides', {
      riderId: 'krishna12',
      pickup: { lat: 12.9716, lng: 77.5946 },
      destination: { lat: 12.9352, lng: 77.6245 },
      tier: 'ECONOMY',
      paymentMethod: 'CARD',
    });

    alert(`Ride created: ${res.data.rideId}`);
    onRideCreated(res.data.rideId);
  };

  return (
    <div>
      <h3>Create Ride</h3>
      <button onClick={createRide}>Create Ride</button>
    </div>
  );
}
