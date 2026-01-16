import { IsEnum, IsString, ValidateNested } from "class-validator";
import { LocationDto } from "./location.dto";
import { Type } from "class-transformer";

export enum RideTier{
    ECONOMY = 'ECONOMY',
    PREMIUM = 'PREMIUM'
}

export enum PaymentMethod{
    CARD ='CARD',
    CASH='CASH',
    UPI='UPI'
}

export class CreateRideDto{
    @IsString()
    riderId: string;

    @ValidateNested()
    @Type(()=> LocationDto)
    pickup: LocationDto;

    @ValidateNested()
    @Type(()=> LocationDto)
    destination: LocationDto;

    @IsEnum(RideTier)
    tier: RideTier

    @IsEnum(PaymentMethod)
    paymentMethod: PaymentMethod
}