import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class IdempotencyKey {
  @PrimaryColumn()
  key: string;

  @Column()
  endpoint: string;

  @Column({ type: 'jsonb' })
  response: any;

  @CreateDateColumn()
  createdAt: Date;
}
