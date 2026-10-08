import { AssignPhoneNumberDto, PhoneNumber } from "@/types/phone-number";
import { BaseService } from "./base.service";
import api, { ApiResponse, API } from "@/lib/api";

class PhoneNumberService extends BaseService<
  PhoneNumber,
  AssignPhoneNumberDto
> {
  constructor() {
    super(API.phoneNumbers.list);
  }

  getPhoneNumbers(): Promise<PhoneNumber[]> {
    return api.get<PhoneNumber[]>(API.phoneNumbers.list);
  }
}

export const phoneNumberService = new PhoneNumberService();
