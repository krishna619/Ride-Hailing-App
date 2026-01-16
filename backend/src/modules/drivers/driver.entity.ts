import { DriverStatus } from "src/common/enums";
import { Column, Entity, Index, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
@Index(['status'])
export class Driver{
    @PrimaryColumn()
    id: string;

    @Column({type:'enum', enum:DriverStatus})
    status: DriverStatus;

    @Column({nullable: true})
    currentRideId?: string;

    @Column({type: 'float', nullable: true})
    lat?: number;

    @Column({type: 'float', nullable: true})
    lng?: number;

    @UpdateDateColumn()
    updatedAt: Date;
}