import { useState } from 'react';
import CreateRide from './components/CreateRide';
import RideStatus from './components/RideStatus';
import DriverPanel from './components/DriverPanel';
import TripPanel from './components/TripPanel';

export default function App() {
  const [rideId, setRideId] = useState(null);
  const [tripId, setTripId] = useState(null);

  return (
    <div>
      <h2>Ride Hailing Demo</h2>

      <CreateRide onRideCreated={setRideId} />
      <RideStatus rideId={rideId} />
      <DriverPanel rideId={rideId} onTripCreated={setTripId} />
      <TripPanel tripId={tripId} />
    </div>
  );
}
