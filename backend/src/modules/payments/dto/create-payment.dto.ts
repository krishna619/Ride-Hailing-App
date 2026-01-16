import { IsEnum, IsNumber, IsUUID } from "class-validator";

export enum PaymentMethod{
    CARD = 'CARD',
    CASH ='CASH',
    UPI='UPI'
}

export class CreatePaymentDto{

    @IsUUID()
    tripId: string;

    @IsNumber()
    amount: number;

    @IsEnum(PaymentMethod)
    paymentMethod: PaymentMethod;
}