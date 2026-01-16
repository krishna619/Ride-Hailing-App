import { RideStatus } from "src/common/enums";
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index(['status'])
export class Ride{
    @PrimaryGeneratedColumn('uuid')
    id: string;

      @Column()
    riderId: string;

    @Column({ type: 'double precision' })
  pickupLat: number;

  @Column({ type: 'double precision' })
  pickupLng: number;

  @Column({ type: 'double precision' })
  destinationLat: number;

  @Column({ type: 'double precision' })
  destinationLng: number;


    @Column({ type: 'enum', enum: RideStatus })
    status: RideStatus;

    @CreateDateColumn()
    createdAt: Date;
}