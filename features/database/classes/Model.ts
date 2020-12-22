import {tableize} from "inflection";
import {database} from "..";
import {
  FindID,
  ModelObjectType,
  ObjectType,
  WhereConditions,
} from "../interfaces";
import {Query} from "./Query";
import {TableCache} from "./Table";

export class Model {
  static selectedFields: Array<string> = [];
  static fetchRelations: boolean = false;

  static getPrimaryKey<T>(model: ObjectType<T>) {
    const cached = TableCache.get(model.name);
    if (cached) {
      return cached.primary;
    }
    return "id";
  }

  static async release<T extends Model>(
    this: ObjectType<T>,
    query: string,
    raw = false,
    returnQuery = false
  ): Promise<T | T[] | string> {
    (this as any).selectedFields = [];
    (this as any).fetchRelations = false;
    if (returnQuery) {
      return query;
    }
    const {count, data} = await database.query(query);
    if (raw) {
      return {count, data} as any;
    }
    const mappedResults = data.map((result) => {
      const model = new this();
      Object.assign(model, result);
      return model;
    });
    return mappedResults.length === 1 ? mappedResults[0] : mappedResults;
  }

  static async all<T extends Model>(
    this: ModelObjectType<T>,
    raw = false,
    returnQuery = false
  ) {
    const table = tableize(this.name);
    const query = Query.get({table, fields: this.selectedFields ?? "*"});
    return await (this as any).release(query, raw, returnQuery);
  }

  static async find<T extends Model>(
    this: ObjectType<T>,
    id: FindID,
    raw = false,
    returnQuery = false
  ) {
    const table = tableize(this.name);
    const primaryKey = Model.getPrimaryKey(this);
    const conditions = Query.whereId(table, primaryKey, id);
    const query = Query.get({table, conditions});
    return await (this as any).release(query, raw, returnQuery);
  }

  static async first<T extends Model>(
    this: ObjectType<T>,
    limit: number,
    raw = false,
    returnQuery = false
  ) {
    const table = tableize(this.name);
    const primaryKey = Model.getPrimaryKey(this);
    const query = Query.get({table, limit, order: "ASC", primary: primaryKey});
    return await (this as any).release(query, raw, returnQuery);
  }

  static async last<T extends Model>(
    this: ObjectType<T>,
    limit: number,
    raw = false,
    returnQuery = false
  ) {
    const table = tableize(this.name);
    const primaryKey = Model.getPrimaryKey(this);
    const query = Query.get({table, limit, order: "DESC", primary: primaryKey});
    return await (this as any).release(query, raw, returnQuery);
  }

  static async take<T extends Model>(
    this: ObjectType<T>,
    limit: number,
    raw = false,
    returnQuery = false
  ) {
    const table = tableize(this.name);
    const query = Query.get({table, limit});
    return await (this as any).release(query, raw, returnQuery);
  }

  static async where<T extends Model>(
    this: ObjectType<T>,
    whereConditions: WhereConditions<T>,
    raw = false,
    returnQuery = false
  ): Promise<T | T[] | string> {
    const table = tableize(this.name);
    const conditions = Query.whereConditions(table, whereConditions);
    const query = Query.get({
      table,
      conditions,
      fields:
        (this as any).selectedFields && (this as any).selectedFields.length > 0
          ? Query.join((this as any).selectedFields)
          : "*",
    });
    return await (this as any).release(query, raw, returnQuery);
  }

  static select<T extends Model>(
    this: ModelObjectType<T>,
    fields: Array<Exclude<keyof T, "save">>
  ) {
    (this as any).selectedFields = fields;
    return this;
  }

  static withRelations<T extends Model>(this: ModelObjectType<T>) {
    (this as any).fetchRelations = true;
    return this;
  }

  async save(returnQuery = false) {
    const table = tableize(this.constructor.name);
    const query = Query.insert<this>(table, this);
    return returnQuery ? query : await database.query(query);
  }
}
