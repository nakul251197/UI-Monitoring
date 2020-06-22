import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    uid: number;

    @Column()
    ipAddress: string;

    @Column()
    userAgent: string;

    @Column()
    deviceType: string;
}