import {Table, Field} from "..";
import {Project} from "./Project";

export class Progress extends Table {
  static fields = [
    new Field("id").primaryKey(),
    new Field("project_id").ref(Project),
    new Field("message").text().notNull(),
    new Field("percentage").int().notNull().default(0),
    new Field("created_at").timestampz(),
  ];
}
