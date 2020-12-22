import {Model} from "../classes/Model";
export type FindID = number | Array<number>;
export type ConditionOperators = ">" | "<" | "=" | "!=";
export type WhereConditions<T> = Partial<
  {
    [K in keyof T]: [ConditionOperators, T[K]] | T[K];
  }
>;
export type QueryGetProps = {
  table: string;
  limit?: number;
  fields?: string | Array<string>;
  conditions?: string;
  order?: "ASC" | "DESC";
  primary?: string;
};
export type FunctionsOnly<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : never;
};
export type FunctionsOnlyWithout<T, B> = Exclude<FunctionsOnly<T>, B>;
export type ObjectType<T> = {
  new (): T;
};
export type ReleaseType<T> = ObjectType<T> & {
  release(
    this: ObjectType<T>,
    query: string,
    raw: boolean,
    returnQuery: boolean
  ): Promise<T | T[]>;
};
export type ModelObjectType<T> = ObjectType<T> & {
  selectedFields: Array<string>;
  all<T extends Model>(
    this: ObjectType<T>,
    raw?: boolean,
    returnQuery?: boolean
  ): Promise<any>;
  first<T extends Model>(
    this: ObjectType<T>,
    limit?: number,
    raw?: boolean,
    returnQuery?: boolean
  ): Promise<any>;
  last<T extends Model>(
    this: ObjectType<T>,
    limit?: number,
    raw?: boolean,
    returnQuery?: boolean
  ): Promise<any>;
  take<T extends Model>(
    this: ObjectType<T>,
    limit?: number,
    raw?: boolean,
    returnQuery?: boolean
  ): Promise<any>;
  find<T extends Model>(
    this: ObjectType<T>,
    id?: FindID,
    raw?: boolean,
    returnQuery?: boolean
  ): Promise<any>;
  where<T extends Model>(
    this: ObjectType<T>,
    whereConditions: WhereConditions<T>,
    raw?: boolean,
    returnQuery?: boolean
  ): Promise<any>;
};
