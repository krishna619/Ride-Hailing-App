import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    tripId: string;

    @Column({type: 'float'})
    amount: number;

    @Column()
    status: string;

    @CreateDateColumn()
    createdAt: Date;
}