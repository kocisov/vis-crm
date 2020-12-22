import {Model} from "..";

export interface Progress {
  id: number;
  project_id: number;
  message: string;
  percentage: number;
  created_at: string;
}

export class Progress extends Model {}
