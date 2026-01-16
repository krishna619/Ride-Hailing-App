import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Driver } from "./driver.entity";
import { Repository } from "typeorm";
import { DriverStatus } from "src/common/enums";
import { UpdateLocationDto } from "./dto/update-location.dto";
import Redis from "ioredis";


@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver) private readonly driverRepo: Repository<Driver>,
    @Inject('REDIS_CLIENT') private readonly redis: Redis
  ){}

  async updateLocation(driverId: string, dto: UpdateLocationDto) {

  await this.driverRepo.upsert(
      {
        id: driverId,
        lat: dto.lat,
        lng: dto.lng,
        status: DriverStatus.AVAILABLE, // only for FIRST insert
      },
      {
        conflictPaths: ['id'],
      },
    );

    await this.redis.hset(
      `driver:${driverId}`,
      'lat',
      dto.lat.toString(),
      'lng',
      dto.lng.toString(),
      'status',
      DriverStatus.AVAILABLE,
    );


    return {success: true};
  }


  async reserveDriver(driverId: string, rideId) {
    
    let driver = await this.driverRepo.findOneBy({id:driverId});

    if(!driver || driver.status!=  DriverStatus.AVAILABLE){
      throw new BadRequestException('Driver not available');
    }

    driver.status= DriverStatus.RESERVED;
    driver.currentRideId = rideId;
    await this.driverRepo.save(driver);
    return driver;
  }

  async markOntrip(driverId){
    await this.driverRepo.update(
      { id: driverId },
      { status: DriverStatus.ON_TRIP },
    );
  }
}