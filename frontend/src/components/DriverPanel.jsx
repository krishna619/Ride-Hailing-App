import { api } from '../api/client';

export default function DriverPanel({ rideId, onTripCreated }) {
  const driverId = 'driver_1';

  const sendLocation = async () => {
    try {
      await api.post(`/drivers/${driverId}/location`, {
        lat: 12.9716,
        lng: 77.5946,
      });
      alert('Driver location sent successfully');
    } catch (err) {
      alert('Failed to send location');
      console.error(err);
    }
  };

  const acceptRide = async () => {
    try {
      const res = await api.post(`/drivers/${driverId}/accept`, {
        rideId,
      });

      alert(`Trip created: ${res.data.tripId}`);
      onTripCreated(res.data.tripId);
    } catch (err) {
      alert(err.response?.data?.message || 'Accept ride failed');
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Driver Panel</h3>

      <button onClick={sendLocation}>
        Send Location
      </button>

      <button onClick={acceptRide} disabled={!rideId}>
        Accept Ride
      </button>
    </div>
  );
}
