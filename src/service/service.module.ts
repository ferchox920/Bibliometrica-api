import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceProductController } from './controller/serviceProduct.controller';

import { ServiceProduct } from './entities/serviceProduct.entity';
import { ServiceProductService } from './service/serviceProduct.service';

@Module({
      imports:[
        TypeOrmModule.forFeature([ServiceProduct])
    ],
    providers: [ServiceProductService],
    controllers: [ServiceProductController]
})
export class ServiceModule {}
