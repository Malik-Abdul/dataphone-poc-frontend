import { BaseEntity } from "./common";

export type PhoneNumberStatus = "UNASSIGNED" | "ASSIGNED" | "DISCONNECTED";

export interface PhoneNumberCustomer {
  id: string;
  name: string;
}

export interface PhoneNumberCarrier {
  id: string;
  name: string;
}

export interface PhoneNumber extends BaseEntity {
  phoneNumber: string;

  status: PhoneNumberStatus;

  acquiredAt: string | null;

  city?: string | null;

  state?: string | null;

  customer?: PhoneNumberCustomer | null;

  carrier: PhoneNumberCarrier;
}

export interface AssignPhoneNumberDto {
  customerId: string;
}

export interface PhoneNumberFilters {
  search: string;
  carrierId: string;
  customerId: string;
  status: PhoneNumberStatus | "";
}
