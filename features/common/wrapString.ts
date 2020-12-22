export function wrapString(value: any) {
  if (typeof value === "string") {
    return `'${value.replace("'", "''")}'`;
  }
  return value;
}
