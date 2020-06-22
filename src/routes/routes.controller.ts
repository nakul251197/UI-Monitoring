import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RouteInfo } from './routes.entity';
import { Request } from 'express';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  async create(@Body() routeData: {route: string;}, @Req() req: Request): Promise<any> {
    await this.routesService.create(req, routeData);
  }

  @Get()
  findAll(req): Promise<RouteInfo[]> {
    return this.routesService.findAll();
  }

  @Get('/count')
  findOne(): Promise<RouteInfo> {
    return this.routesService.getCount();
  }
}