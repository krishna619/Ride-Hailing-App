export enum RideStatus {
  REQUESTED = 'REQUESTED',
  MATCHING = 'MATCHING',
  ASSIGNED = 'ASSIGNED',
  CANCELLED = 'CANCELLED'
}

export enum TripStatus {
  CREATED = 'CREATED',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED'
}

export enum DriverStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  ON_TRIP = 'ON_TRIP'
}
