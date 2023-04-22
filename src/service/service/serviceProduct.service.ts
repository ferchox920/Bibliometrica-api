import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { ServiceProduct } from '../entities/serviceProduct.entity';

@Injectable()
export class ServiceProductService {
  constructor(
    @InjectRepository(ServiceProduct)
    private readonly serviceRepository: Repository<ServiceProduct>,
  ) {}

  async create(service: ServiceProduct): Promise<ServiceProduct> {
    return await this.serviceRepository.save(service);
  }

  async findAll(): Promise<ServiceProduct[]> {
    return await this.serviceRepository.find();
  }

  async findById(id: number): Promise<ServiceProduct> {
    return await this.serviceRepository.findOne({where:{id}});
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
    await this.serviceRepository.delete(id);
  }

  async findByLeaderName(name: string): Promise<ServiceProduct[]> {
    return await this.serviceRepository.createQueryBuilder('service')
      .leftJoin('service.leaders', 'leader')
      .where('leader.name = :leaderName', { leaderName: name })
      .getMany();
  }
  

  async findByCreatorName(creatorName: string): Promise<ServiceProduct[]> {
    return await this.serviceRepository.createQueryBuilder('service')
      .leftJoin('service.creator', 'creator')
      .where('creator.name = :creatorName', { creatorName })
      .getMany();
  }
  
  
  
}
