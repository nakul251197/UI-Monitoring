import { PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Entity } from "typeorm";
import { User } from "src/users/users.entity";

@Entity()
export class RouteInfo {

    @PrimaryGeneratedColumn()
    rid: number;

    @Column()
    route: string;

    @Column('timestamp')
    loggedAt: Date;

    @ManyToMany(type => User)
    @JoinTable()
    users: User[];

}