import { Service } from 'src/service/entities/serviceProduct.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Organization {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({nullable: true})
    name: string;
  
    @Column({nullable: true})
    location: string;
  
    @Column({unique: true})
    area : string;
  
    @Column()
    plan: string;

    @OneToMany(() => Service, service => service.organization)
    services: Service[];
    
}
