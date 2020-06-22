import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Connection, EntityManager } from "typeorm";
import { RouteInfo } from "./routes.entity";
import { Request } from 'express';
import { User } from "src/users/users.entity";
import { UsersService } from "src/users/users.service";
import { CreateUserDto } from "src/users/createUser.dto";
import { UAParser } from "ua-parser-js";

@Injectable()
export class RoutesService {
    constructor(@InjectRepository(RouteInfo)
    private routesRepository: Repository<RouteInfo>,
        private userService: UsersService, 
        private manager: EntityManager) {

    }

    async create(req: Request, routeData: { route: string; }) {
        let ipAddress = req.ip;
        let user: User = await this.userService.findOne(ipAddress);
        if (user == undefined) {
            let uaParser = new UAParser(req.headers["user-agent"]);
            let newUser: CreateUserDto = {
                ipAddress: ipAddress,
                userAgent: req.headers["user-agent"],
                deviceType: uaParser.getDevice().type
            };
            user = await this.userService.create(newUser);
        }

        const routeInfo = new RouteInfo();
        routeInfo.route = routeData.route;
        routeInfo.users = [user];
        routeInfo.loggedAt = new Date();
        this.routesRepository.save(routeInfo);
    }

    async findAll(): Promise<RouteInfo[]> {
        return await this.manager.query('select u.ipaddress, r.route, r.loggedat from user u inner join route_info_users_user ru on ru.userUid = u.uid inner join route_info r on r.rid = ru.routeInfoRid');
    }

    async getCount(): Promise<any> {
        return await this.manager.query('select r.route, count(*) as Count from route_info r inner join route_info_users_user ru on ru.routeInfoRid = r.rid group by 1;');
    }

}