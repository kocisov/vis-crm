import {wrapString} from "@/features/common/wrapString";
import {foreign_key, tableize} from "inflection";
import {Table} from "./Table";

export class Field {
  private primary = false;
  private type = "TEXT";
  private defaultValue?: any;
  private isNullable = true;
  private references?: [string, Array<string> | string];

  constructor(private name?: string) {
    return this;
  }

  primaryKey(): Pick<this, "build"> {
    this.primary = true;
    this.type = "SERIAL";
    return this;
  }

  text() {
    this.type = "TEXT";
    return this;
  }

  int() {
    this.type = "INT";
    return this;
  }

  timestampz(): Pick<this, "default" | "build"> {
    this.type = "TIMESTAMPTZ";
    this.isNullable = false;
    this.defaultValue = "NOW()";
    return this;
  }

  varchar(size = 255) {
    this.type = `VARCHAR(${size})`;
    return this;
  }

  boolean() {
    this.type = "BOOLEAN";
    return this;
  }

  default(value: string | number | "NULL") {
    this.defaultValue = wrapString(value);
    return this;
  }

  notNull() {
    this.isNullable = false;
    return this;
  }

  ref(table: Table & {name: string}, key = "id"): Pick<this, "build"> {
    this.references = [tableize(table.name), key];
    this.type = "INT";
    if (!this.name) {
      this.name = foreign_key(table.name);
    }
    return this;
  }

  static returnQuery(array: Array<any>) {
    return array
      .filter((value) => value)
      .join(" ")
      .trimEnd();
  }

  build() {
    if (this.primary) {
      if (!this.name) {
        throw new Error("Field name must be specified!");
      }
      return {
        primary: this.name,
        out: `${this.name} ${this.type} PRIMARY KEY`,
      };
    }

    if (this.references) {
      const [left, rawRight] = this.references;
      const right = Array.isArray(rawRight) ? rawRight.join(", ") : rawRight;
      return {
        out: `${this.name} ${this.type} REFERENCES ${left}(${right})`,
      };
    }

    return {
      out: Field.returnQuery([
        this.name,
        this.type,
        !this.isNullable && "NOT NULL",
        this.defaultValue && `DEFAULT ${this.defaultValue}`,
      ]),
    };
  }
}
