import {Model} from "..";

export interface Project {
  id: number;
  user_id: number;
  name: string;
  deadline: string;
  is_completed: boolean;
  is_payed: boolean;
  is_accepted: boolean;
  price: string;
  created_at: string;
}

export class Project extends Model {}
