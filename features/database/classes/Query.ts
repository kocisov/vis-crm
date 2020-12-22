import {wrapString} from "@/features/common/wrapString";
import {FindID, QueryGetProps, WhereConditions} from "../interfaces";

export class Query {
  static join(values: Array<string | number>) {
    return values.join(", ");
  }

  static array(array: Array<string | number | undefined>) {
    return array.filter((value) => value).join(" ");
  }

  static get({
    table,
    fields = "*",
    conditions,
    limit,
    order,
    primary = "id",
  }: QueryGetProps) {
    if (Array.isArray(fields) && fields.length > 0) {
      fields = Query.join(fields);
    } else {
      fields = "*";
    }
    return Query.array([
      `SELECT ${fields} FROM ${table}`,
      conditions && `WHERE ${conditions}`,
      order && `ORDER BY ${table}.${primary} ${order}`,
      limit && `LIMIT ${limit}`,
    ]);
  }

  static insert<T>(table: string, fields: Partial<T>, conditions?: string) {
    const keys = Object.keys(fields);
    const values = keys.map((key) => wrapString((fields as any)[key]));

    return Query.array([
      `INSERT INTO ${table}(${keys}) VALUES(${values})`,
      conditions && `WHERE ${conditions}`,
      `ON CONFLICT`,
      // UPSERT
      /*
        `DO UPDATE SET`,
        Query.join(
          keys.map((key) => `${key} = ${wrapString((fields as any)[key])}`)
        ),
      */
      `DO NOTHING`,
    ]);
  }

  static insertValues<T>(fieldsWithValues: Partial<T>) {
    const keys = Object.keys(fieldsWithValues);
    const values = keys.map((key) => (fieldsWithValues as any)[key]);
    return [keys, values];
  }

  static whereId(table: string, primary: string, id: FindID) {
    if (Array.isArray(id)) {
      return `(${table}.${primary} IN (${Query.join(id)}))`;
    }
    return `${table}.${primary} = ${id}`;
  }

  static whereConditions<T>(table: string, conditions: WhereConditions<T>) {
    return Query.join(
      Object.keys(conditions).map((condition) => {
        const mapped = (conditions as any)[condition];
        if (Array.isArray(mapped)) {
          const [operation, value] = mapped;
          return `${table}.${condition} ${operation} ${value}`;
        }
        return `${table}.${condition} = ${wrapString(mapped)}`;
      })
    );
  }
}
