import {Model} from "..";

export interface Invoice {
  id: number;
  user_id: number;
  cost: string;
  is_payed: boolean;
  due: string;
  created_at: string;
}

export class Invoice extends Model {}
