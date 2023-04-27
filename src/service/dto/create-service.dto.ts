import { Organization } from "src/organization/entities/organization.entity";
import { User } from "src/user/entities/user.entity";

export class CreateServiceDto {

  name: string;

  description: string;

  duration: string;

  expiration: string;

  video?: string;

  img?: string;

  available: boolean;

  capacity: number;

  document?: string;

  creatorId: number;

  leadersIds: number[];

  organizationId: number;
}