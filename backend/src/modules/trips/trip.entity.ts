import { TripStatus } from "src/common/enums";
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index(['driverId'])
@Index(['rideId'])
export class Trip{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    rideId: string;

    @Column()
    driverId: string

    @Column({type: 'enum', enum: TripStatus})
    status: TripStatus;

    @Column({type: 'float', nullable: true})
    fare?: number;

    @CreateDateColumn()
    createdAt: Date;
}