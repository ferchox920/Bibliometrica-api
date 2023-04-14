import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
    video: Text;

    @Column({nullable: true})
    img: Text;

    @Column()
    avalible: boolean;

    @Column()
    capacity: number;

    @Column({nullable: true})
    document: Text;
}
