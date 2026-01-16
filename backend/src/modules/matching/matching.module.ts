import { forwardRef, Module } from '@nestjs/common';
import { DriversController } from '../drivers/drivers.controller';
import { DriversService } from '../drivers/drivers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriversModule } from '../drivers/drivers.module';
import { RidesModule } from '../rides/rides.module';
import { Trip } from '../trips/trip.entity';
import { Driver } from '../drivers/driver.entity';
import { Ride } from '../rides/ride.entity';
import { MatchingService } from './matching.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trip, Driver, Ride]),
    forwardRef(() => DriversModule),  
    RidesModule,  
  ],
  providers: [MatchingService],
  exports: [MatchingService],
})
export class MatchingModule {}

