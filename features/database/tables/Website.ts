import {Field, Table} from "..";
import {Project} from "./Project";

export class Website extends Table {
  static fields = [
    new Field("id").primaryKey(),
    new Field("project_id").ref(Project),
    new Field("url").text().notNull(),
    new Field("external").boolean().notNull().default(0),
    new Field("cost").text().notNull(),
    new Field("created_at").timestampz(),
    new Field("last_updated_at").timestampz(),
  ];
}
