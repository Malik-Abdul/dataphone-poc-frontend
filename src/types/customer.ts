import { BaseEntity } from "./common";

export interface Customer extends BaseEntity {
  name: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
}

export interface CreateCustomerDto {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface UpdateCustomerDto {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}
