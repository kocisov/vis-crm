import {Model} from "..";

export interface Address {
  id: number;
  user_id: number;
  city: string;
  street: string;
  province: string;
  postal_code: string;
  active: boolean;
  type: string;
  created_at: string;
}

export class Address extends Model {}
