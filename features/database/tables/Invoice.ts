import {Field, Table} from "..";
import {User} from "./User";

export class Invoice extends Table {
  static fields = [
    new Field("id").primaryKey(),
    new Field("user_id").ref(User),
    new Field("is_payed").boolean().notNull().default(0),
    new Field("cost").text().notNull().default("0"),
    new Field("due").text(),
    new Field("created_at").timestampz(),
  ];
}
