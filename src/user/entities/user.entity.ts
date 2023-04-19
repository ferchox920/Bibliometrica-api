import { Service } from 'src/service/entities/service.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  firstName: string;

  @Column({nullable: true})
  lastName: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @ManyToMany(()=> Service, (service)=> service.members)
  services: Service[];
}