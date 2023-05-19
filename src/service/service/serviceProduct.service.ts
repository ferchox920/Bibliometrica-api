import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { ServiceProduct } from '../entities/serviceProduct.entity';
import { CreateServiceDto } from '../dto/create-service.dto';
import { Organization } from 'src/organization/entities/organization.entity';

@Injectable()
export class ServiceProductService {
  constructor(
    @InjectRepository(ServiceProduct)
    private  serviceRepository: Repository<ServiceProduct>,
    @InjectRepository(Organization)
    private organizationRepo : Repository<Organization>,
    @InjectRepository(User)
    private userRepo : Repository<User>
  ) {}

  async create(service: CreateServiceDto): Promise<ServiceProduct> {
//------------organization-----------------------------------
    const organization = await this.organizationRepo.findOne({where:{
      id: service.organizationId
    }})
    if(!organization){ throw new HttpException("ORGANIZATION_NOT_FOUND", 404)}

//------------creator-----------------------------------
    const creator = await this.userRepo.findOne({where:{id: service.creatorId}})
    if(!creator){throw new HttpException("USER_NOT_FOUND", 404)}

//------------leaders-----------------------------------
    const ids = service.leadersIds 
    const leaders = await this.userRepo
      .createQueryBuilder('user')
      .where('user.id IN (:...ids)', { ids })
      .getMany();

    const newService = await this.serviceRepository.create(service)

    newService.organization = organization;
    newService.creator = creator;
    newService.leaders = leaders;

    
    return await this.serviceRepository.save(newService);
  }

  async findAll(): Promise<ServiceProduct[]> {
    return await this.serviceRepository.find();
  }

  async findById(id: number): Promise<ServiceProduct> {
    return await this.serviceRepository.findOne({where:{id}});
  }

  async findByUserOrganization(){
    // Antes de hacer este endpoint hay que establecer
    // relaciones entre los usuarios y la organizaciones
  }

  async update(id: number, service: Partial<ServiceProduct>): Promise<ServiceProduct> {
    const existingService = await this.serviceRepository.findOne({where:{id}});
    if (!existingService) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
    const updatedService = Object.assign(existingService, service);
    return this.serviceRepository.save(updatedService);
  }
  

  async delete(id: number): Promise<void> {
    const serviceDelete = await this.serviceRepository.find({where:{id}})
    if(!serviceDelete){throw new NotFoundException(`Service with id ${id} not found`);}
    await this.serviceRepository.delete(id);
  }

  async findByLeaderEmail(email: string): Promise<ServiceProduct[]> {
    return await this.serviceRepository.createQueryBuilder('service')
      .leftJoin('service.leaders', 'leader')
      .where('leader.email = :leaderEmail', { leaderEmail: email })
      .getMany();
  }
  

  async findByCreatorEmail(creatorEmail: string): Promise<ServiceProduct[]> {
    return await this.serviceRepository.createQueryBuilder('service')
      .leftJoin('service.creator', 'creator')
      .where('creator.email = :creatorEmail', { creatorEmail })
      .getMany();
  }
}
