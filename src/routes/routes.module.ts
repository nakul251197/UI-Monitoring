import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RouteInfo } from "./routes.entity";
import { RoutesService } from "./routes.service";
import { RoutesController } from "./routes.controller";
import { UsersService } from "src/users/users.service";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [ TypeOrmModule.forFeature([RouteInfo]),
    UsersModule    
],
    providers: [ RoutesService ],
    controllers: [ RoutesController ],
})
export class RoutesModule {
    
}