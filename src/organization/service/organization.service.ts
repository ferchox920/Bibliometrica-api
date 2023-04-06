import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../entities/organization.entity';
import { createUserDto } from 'src/user/dto/create-user.dto';
import { CreateOrganizationDto } from '../dto/create-organization.dto';
import { UpdateOrganizationDto } from '../dto/update-organization.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async findAll(): Promise<Organization[]> {
    return this.organizationRepository.find();
  }

  async findOne(id: number): Promise<Organization> {
    return this.organizationRepository.findOne({ where: { id } });
  }

  async create(data: CreateOrganizationDto): Promise<Organization> {
    const organization = this.organizationRepository.create(data);
    return this.organizationRepository.save(organization);
  }

  async update(id: number, data: UpdateOrganizationDto): Promise<Organization> {
    const organization = await this.organizationRepository.findOne({
      where: { id },
    });
    this.organizationRepository.merge(organization, data);
    return this.organizationRepository.save(organization);
  }

  async delete(id: number): Promise<void> {
    await this.organizationRepository.delete(id);
  }
}
