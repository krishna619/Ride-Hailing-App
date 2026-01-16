import { Body, Controller, forwardRef, Inject, Param, Post, UseInterceptors } from "@nestjs/common";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { AcceptRideDto } from "./dto/accept-ride.dto";
import { DriversService } from "./drivers.service";
import { MatchingService } from "../matching/matching.service";
import { IdempotencyInterceptor } from "src/common/interceptors/idempotency.interceptor";

@Controller('/v1/drivers')
export class DriversController{
    constructor(
        private readonly driversService: DriversService,
        @Inject(forwardRef(() => MatchingService))
        private readonly matchingService: MatchingService
        
    ){}

    @Post('/:id/location')
    updateLocation(@Param('id') driverId: string,@Body() dto: UpdateLocationDto){
        return this.driversService.updateLocation(driverId,dto); 
    }
    @Post('/:id/accept')
    @UseInterceptors(IdempotencyInterceptor)
    acceptRide(@Param('id') driverId: string, @Body() dto: AcceptRideDto){
        return this.matchingService.acceptRide(driverId,dto.rideId); 
    }
}