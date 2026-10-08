import {
  CreateCustomerDto,
  Customer,
  UpdateCustomerDto,
} from "@/types/customer";

import { BaseService } from "./base.service";
import api, { API } from "@/lib/api";

class CustomerService extends BaseService<
  Customer,
  CreateCustomerDto,
  UpdateCustomerDto
> {
  constructor() {
    super(API.customers.list);
  }

  getCustomers(): Promise<Customer[]> {
    return api.get<Customer[]>(API.customers.list);
  }

  getCustomer(id: string): Promise<Customer> {
    return api.get<Customer>(API.customers.byId(id));
  }
}

export const customerService = new CustomerService();
