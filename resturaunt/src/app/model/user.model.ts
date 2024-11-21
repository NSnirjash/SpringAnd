import { Role } from "./Role.model";
import { Token } from "./token.model";

export class User {
    id!: number;
    name!: string;
    email!: string;
    password!: string;
    address!: string;
    phone!: string;
    image!: string;
    active!: boolean;
    lock!: boolean;
    role!: Role;
  
    tokens!: Token[];
  
    
  }