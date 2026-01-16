import { Module } from '@nestjs/common';
import { RidesController } from './rides.controller';
import { RidesService } from './rides.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ride } from './ride.entity';
import { IdempotencyKey } from 'src/common/enitities/idempotency.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Ride,IdempotencyKey])],
    controllers: [RidesController],
    providers: [RidesService],
    exports: [RidesService]
})
export class RidesModule {}
