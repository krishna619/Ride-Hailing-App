import { Module } from '@nestjs/common';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './trip.entity';
import { Driver } from '../drivers/driver.entity';
import { IdempotencyKey } from 'src/common/enitities/idempotency.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Trip,Driver,IdempotencyKey])],
    controllers: [TripsController],
    providers: [TripsService],
    exports: [TripsService]
})
export class TripsModule {}
