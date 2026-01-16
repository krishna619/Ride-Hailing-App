import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { IdempotencyInterceptor } from "src/common/interceptors/idempotency.interceptor";

@Controller('/v1/payments')
export class PaymentsController{
    constructor(private readonly paymentsService: PaymentsService){}

    @Post()
    @UseInterceptors(IdempotencyInterceptor)
    createPayment(@Body() dto: CreatePaymentDto){
        return this.paymentsService.createPayment(dto);
    }
}