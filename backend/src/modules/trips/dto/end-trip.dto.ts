import { IsNumber } from "class-validator";

export class EndTripDto{
    
    @IsNumber()
    endLat: number;

    @IsNumber()
    endLng: number;
}