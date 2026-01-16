import { Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "./payment.entity";
import { Repository } from "typeorm";


@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {} 

  async createPayment(dto: CreatePaymentDto) {
    const payment = await this.paymentRepo.create({
      tripId: dto.tripId,
      amount: dto.amount,
      status: 'SUCCESS'
    });

    await this.paymentRepo.save(payment);

    return {
      paymentId: payment.id,
      status: payment.status,
    }; 
  }
}
