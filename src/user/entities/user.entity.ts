import { ServiceProduct } from 'src/service/entities/serviceProduct.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => ServiceProduct)
  @JoinTable()
  services: ServiceProduct[];

  @ManyToOne(() => User, (user) => user.services)
  creator: User;
}
