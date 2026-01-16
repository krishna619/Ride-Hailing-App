import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Trip } from "./trip.entity";
import { DriverStatus, TripStatus } from "src/common/enums";
import { InjectRepository } from "@nestjs/typeorm";
import { Driver } from "../drivers/driver.entity";
import Redis from "ioredis";


@Injectable()
export class TripsService {
  constructor(
    private readonly dataSource: DataSource,
    @Inject('REDIS_CLIENT') private readonly redis: Redis
  ){}

async endTrip(tripId: string) {
  return this.dataSource.transaction(async manager => {
    const trip = await manager.findOne(Trip, {
      where: { id: tripId },
      lock: { mode: 'pessimistic_write' },
    });

    if (!trip || trip.status !== TripStatus.CREATED) {
      throw new BadRequestException('Invalid trip');
    }

    const driver = await manager.findOne(Driver, {
      where: { id: trip.driverId },
      lock: { mode: 'pessimistic_write' },
    });

    if (!driver) {
      throw new BadRequestException('Driver not found');
    }


    trip.status = TripStatus.COMPLETED;
    trip.fare = this.calculateFare();

    driver.status = DriverStatus.AVAILABLE;
    driver.currentRideId = undefined;

    await manager.save([trip, driver]);
      await this.redis.hset(
    `driver:${driver.id}`,
    'status',
    DriverStatus.AVAILABLE,
  );


    return {
      fare: trip.fare,
      currency: 'INR',
      status: trip.status,
    };
  });
}

  calculateFare(){
   return Math.round((100 + Math.random() * 200) * 100) / 100;
  }
}
