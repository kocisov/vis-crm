import {Table, Field} from "..";
import {User} from "./User";

export class Address extends Table {
  static fields = [
    new Field("id").primaryKey(),
    new Field("user_id").ref(User),
    new Field("city").text().notNull(),
    new Field("street").text().notNull(),
    new Field("province").text().notNull(),
    new Field("postal_code").text().notNull(),
    new Field("active").boolean().notNull().default(0),
    new Field("type").text().notNull(),
    new Field("created_at").timestampz(),
  ];
}
