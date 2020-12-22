import {Table, Field} from "..";
import {User} from "./User";

export class Project extends Table {
  static fields = [
    new Field("id").primaryKey(),
    new Field("user_id").ref(User),
    new Field("name").text().notNull(),
    new Field("deadline").text().notNull(),
    new Field("price").text().notNull(),
    new Field("is_completed").boolean().notNull().default(0),
    new Field("is_accepted").boolean().notNull().default(0),
    new Field("is_payed").boolean().notNull().default(0),
    new Field("created_at").timestampz(),
  ];
}
