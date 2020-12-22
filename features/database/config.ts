import {Database} from "@/database/classes/Database";

export const database = new Database({
  user: "postgres",
  password: "test",
  database: "vis",
});
