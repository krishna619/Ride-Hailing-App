import { Module } from '@nestjs/common';
import { RidesModule } from './modules/rides/rides.module';
import { DriversModule } from './modules/drivers/drivers.module';
import { TripsModule } from './modules/trips/trips.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { MatchingModule } from './modules/matching/matching.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from './common/redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    RedisModule,
    RidesModule,
    DriversModule,
    TripsModule,
    PaymentsModule,
    MatchingModule,
  ],
})
export class AppModule {}
