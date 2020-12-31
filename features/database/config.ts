import {Database} from "@/database/classes/Database";

export const database = Database.setup({
  user: "postgres",
  password: "test",
  database: "vis",
});
