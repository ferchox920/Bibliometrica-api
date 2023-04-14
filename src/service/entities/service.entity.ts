import { Organization } from 'src/organization/entities/organization.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Service {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    description: string;
  
    @Column()
    duration : string;
  
    @Column()
    expiration: string;

    @Column({nullable: true})
    video: string;

    @Column({nullable: true})
    img: string;

    @Column()
    avalible: boolean;

    @Column()
    capacity: number;

    @Column({nullable: true})
    document: string;

    @ManyToOne(()=> Organization, organization=> organization.services)
    organization: Organization;
}
