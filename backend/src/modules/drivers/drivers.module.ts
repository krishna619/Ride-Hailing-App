import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';
import { DriverStatus } from 'src/common/enums';
import { MatchingModule } from '../matching/matching.module';
import { IdempotencyKey } from 'src/common/enitities/idempotency.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Driver,IdempotencyKey]),
    forwardRef(() => MatchingModule), ],
    controllers: [DriversController],
    providers: [DriversService],
    exports: [DriversService]
})
export class DriversModule {}
