import {tableize} from "inflection";
import {database} from "..";
import {Field} from "./Field";

export const TableCache = new Map<string, {primary: string}>();

export class Table {
  static fields: Array<Field | Pick<Field, "build">>;
  static primary = "id";
  static table = "";

  static template(table: string, rawFields: Array<string>) {
    const space = "  ";
    const fields = rawFields.join(`,\n${space}`);
    return `CREATE TABLE IF NOT EXISTS ${table}(\n${space}${fields}\n)`;
  }

  static async create(raw = false) {
    const fields = this.fields.map((field) => {
      const {primary, out} = field.build();
      if (primary) {
        this.primary = primary;
      }
      return out;
    });
    const table = tableize(new this().constructor.name);
    this.table = table;
    TableCache.set(table, this);
    const query = Table.template(table, fields);
    return raw ? query : await database.query(query);
  }

  static async drop(raw = false) {
    const query = `DROP TABLE IF EXISTS ${this.table}`;
    return raw ? query : await database.query(query);
  }

  // Not yet implemented
  static async alter(action: string) {
    return await database.query(`ALTER TABLE ${this.table} ${action}`);
  }
}
