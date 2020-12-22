import {serializeAuthCookie} from "@/features/cookies/serializeAuthCookie";
import {NextApiRequest, NextApiResponse} from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const cookie = serializeAuthCookie();
  res.setHeader("Set-Cookie", cookie);
  return res.status(200).json({
    success: true,
    message: "Logged out.",
  });
}
