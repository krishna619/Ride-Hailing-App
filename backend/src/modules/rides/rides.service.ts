import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateRideDto } from "./dto/create-ride.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Ride } from "./ride.entity";
import { Repository } from "typeorm";
import { RideStatus } from "src/common/enums";
import Redis from "ioredis";

@Injectable()
export class RidesService{
    constructor(
        @InjectRepository(Ride) private readonly rideRepo: Repository<Ride>,
        @Inject('REDIS_CLIENT') private readonly redis: Redis

    ){}
    
    async createRide(dto:CreateRideDto){
        const ride = await this.rideRepo.create({
            riderId: dto.riderId,
            pickupLat: dto.pickup.lat,
            pickupLng: dto.pickup.lng,
            destinationLat: dto.destination.lat,
            destinationLng: dto.destination.lng,
            status: RideStatus.MATCHING,
        });
        await this.rideRepo.save(ride);
        return { rideId: ride.id, status: ride.status };
    }
    
    async assignDriver(rideId: string, driverId: string){
        const ride = await this.rideRepo.findOneBy({id:rideId});
        
        if(!ride || ride.status!=RideStatus.MATCHING){
            throw new BadRequestException('Ride not matchable');
        }
        ride.status = RideStatus.ASSIGNED;
        await this.rideRepo.save(ride);
    }

    async getRide(id: string){
        const cached = await this.redis.get(`ride:${id}`);
        if (cached) {
            return JSON.parse(cached);
        }

        const ride = await this.rideRepo.findOneBy({ id });
        if (ride) {
            await this.redis.set(
            `ride:${id}`,
            JSON.stringify(ride),
            'EX',
            60,
            );
        }
        return ride;
    }
}
