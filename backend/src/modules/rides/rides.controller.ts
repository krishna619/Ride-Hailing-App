import { Body, Controller, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { RidesService } from "./rides.service";
import { CreateRideDto } from "./dto/create-ride.dto";
import { IdempotencyInterceptor } from "src/common/interceptors/idempotency.interceptor";

@Controller('v1/rides')
export class RidesController{
    constructor(private readonly ridesService: RidesService){}

    @Post()
    @UseInterceptors(IdempotencyInterceptor)
    createRide(@Body() dto: CreateRideDto){
        return this.ridesService.createRide(dto);
    }

    @Get(':id')
    getRide(@Param('id') id:string){
        return this.ridesService.getRide(id);
    }
}