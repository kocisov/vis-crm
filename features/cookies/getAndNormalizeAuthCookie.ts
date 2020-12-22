import {parse} from "cookie";

export function getAndNormalizeAuthCookie(rawCookies: string) {
  const cookies = parse(rawCookies);
}
