import { Organization } from 'src/organization/entities/organization.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

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

    @ManyToMany(()=> User, user=> user.services )
    members: User[];
}

