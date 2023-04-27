import { Controller, Get, Post, Put, Patch, Body, Param } from '@nestjs/common';
import { CreateServiceDto } from '../dto/create-service.dto';
import { ServiceProduct } from '../entities/serviceProduct.entity';

import { ServiceProductService } from '../service/serviceProduct.service';

@Controller('service')
export class ServiceProductController {
    constructor(private serviceProductService : ServiceProductService){}

    @Get()
    findAll(): Promise<ServiceProduct[]>{
        return this.serviceProductService.findAll();
    }

    @Get(':id')
    findById(@Param() id : number): Promise <ServiceProduct>{
        return this.serviceProductService.findById(id);
    }

    @Get('leader/:leaderName')
    findByLeaderName(@Param() leaderName : string){
        return this.serviceProductService.findByLeaderName(leaderName)
    }

    @Post()
    create(@Body() newService : CreateServiceDto){
        return this.serviceProductService.create(newService)
    }

    @Get('creator/:creatorName')
    findByCreatorName(){

    }

}
