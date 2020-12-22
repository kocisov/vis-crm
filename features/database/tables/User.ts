import {Field, Table} from "..";

export class User extends Table {
  static fields = [
    new Field("id").primaryKey(),
    new Field("email").text().notNull(),
    new Field("password").text().notNull(),
    new Field("name").text().notNull(),
    new Field("role").text().notNull(),
    new Field("created_at").timestampz(),
  ];
}
