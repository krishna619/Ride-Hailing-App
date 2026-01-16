import { Controller, Param, Post, UseInterceptors } from "@nestjs/common";
import { TripsService } from "./trips.service";
import { IdempotencyInterceptor } from "src/common/interceptors/idempotency.interceptor";

@Controller('/v1/trips')
export class TripsController{
    constructor(private readonly tripsService: TripsService){}

    @Post('/:id/end')
    @UseInterceptors(IdempotencyInterceptor)
    updateLocation(@Param('id') id: string){
        return this.tripsService.endTrip(id); 
    }
}