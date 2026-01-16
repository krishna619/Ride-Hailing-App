import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { IdempotencyKey } from 'src/common/enitities/idempotency.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Payment,IdempotencyKey])],
    controllers: [PaymentsController],
    providers: [PaymentsService],
    exports: [PaymentsService]
})
export class PaymentsModule {}
