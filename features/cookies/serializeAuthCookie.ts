import {serialize} from "cookie";

export function serializeAuthCookie(data?: object) {
  return serialize("CRM_USER", JSON.stringify(data ?? {}), {
    httpOnly: true,
    path: "/",
    secure: false /* process.env.NODE_ENV === "production" */,
    sameSite: "lax",
    ...(!data ? {maxAge: -1, expires: new Date(0)} : {}),
  });
}
