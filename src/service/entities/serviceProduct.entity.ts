import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Organization } from 'src/organization/entities/organization.entity';

@Entity()
export class ServiceProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  duration: string;

  @Column()
  expiration: string;

  @Column({ nullable: true })
  video: string;

  @Column({ nullable: true })
  img: string;

  @Column()
  available: boolean;

  @Column()
  capacity: number;

  @Column({ nullable: true })
  document: string;

  @ManyToOne(() => User, user => user.services)
  creator: User;

  @ManyToMany(() => User)
  @JoinTable()
  leaders: User[];

  @ManyToMany(() => User)
  @JoinTable()
  group: User[];

  @ManyToOne(()=> Organization, organization => organization.services)
  @JoinTable()
  organization: Organization;
}
