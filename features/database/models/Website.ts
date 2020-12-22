import {Model} from "..";
import {Project} from "./Project";

export interface Website {
  id: number;
  project_id: number;
  url: string;
  external: boolean;
  cost: string;
  created_at: string;
  last_updated_at: string;
}

export class Website extends Model {}
