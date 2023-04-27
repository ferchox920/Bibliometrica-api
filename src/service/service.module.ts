import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from 'src/organization/entities/organization.entity';
import { OrganizationService } from 'src/organization/service/organization.service';
import { User } from 'src/user/entities/user.entity';
import { ServiceProductController } from './controller/serviceProduct.controller';

import { ServiceProduct } from './entities/serviceProduct.entity';
import { ServiceProductService } from './service/serviceProduct.service';

@Module({
      imports:[
        TypeOrmModule.forFeature([ServiceProduct, Organization, User])
    ],
    providers: [ServiceProductService],
    controllers: [ServiceProductController]
})
export class ServiceModule {}
