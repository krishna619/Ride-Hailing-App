import { BadRequestException, forwardRef, Inject, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { DriversService } from "../drivers/drivers.service";
import { RidesService } from "../rides/rides.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Trip } from "../trips/trip.entity";
import { Driver } from "../drivers/driver.entity";
import { DriverStatus, RideStatus, TripStatus } from "src/common/enums";
import { Ride } from "../rides/ride.entity";
import Redis from "ioredis";

@Injectable()
export class MatchingService{
    constructor(  
        private readonly datasource: DataSource,
        @Inject(forwardRef(() => DriversService))
        private readonly driversService: DriversService,
        private readonly ridesService: RidesService,
        @InjectRepository(Trip)
        private readonly tripRepo: Repository<Trip>,
         @Inject('REDIS_CLIENT') private readonly redis: Redis
    ){}

    async acceptRide(driverId: string, rideId: string){
        return this.datasource.transaction(async manager => {
            const driver = await manager.findOne(Driver, {
                where: {id: driverId},
                lock: {mode: 'pessimistic_write'},
            });

            if(!driver || driver.status!= DriverStatus.AVAILABLE){
                throw new BadRequestException('Driver not available');
            }

            const ride = await manager.findOne(Ride, {
                where: {id: rideId},
                lock: {mode: 'pessimistic_write'},
            });

            if(!ride || ride.status != RideStatus.MATCHING){
                throw new BadRequestException('Ride not matchable');
            }

            driver.status = DriverStatus.ON_TRIP;
            driver.currentRideId = rideId;
            await this.redis.hset(
                `driver:${driverId}`,
                'status',
                DriverStatus.ON_TRIP,
            );

            ride.status = RideStatus.ASSIGNED;

            const trip  = manager.create(Trip,{
                rideId,
                driverId,
                status: TripStatus.CREATED
            });

            await manager.save([driver,ride,trip]);
            return { tripId: trip.id, status: trip.status };
        });
    }
}