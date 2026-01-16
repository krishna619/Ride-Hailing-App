import { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function RideStatus({ rideId }) {
  const [ride, setRide] = useState(null);

  useEffect(() => {
    if (!rideId) return;

    const interval = setInterval(async () => {
      const res = await api.get(`/rides/${rideId}`);
      setRide(res.data);
    }, 2000);

    return () => clearInterval(interval);
  }, [rideId]);

  if (!rideId) return null;

  return (
    <div>
      <h3>Ride Status (Live)</h3>
      <div><b>Ride ID:</b> {rideId}</div>
      <div><b>Status:</b> {ride?.status}</div>
      <pre>{JSON.stringify(ride, null, 2)}</pre>
    </div>
  );
}
