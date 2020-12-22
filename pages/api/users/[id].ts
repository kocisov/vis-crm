import {NextApiRequest, NextApiResponse} from "next";
import {User} from "@/database/models/User";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const {method, cookies} = await req;
    const {id} = await req.query;

    const hasAuthCookie = "CRM_USER" in cookies;

    if (!hasAuthCookie) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request.",
      });
    }

    const cookieBody = JSON.parse(cookies.CRM_USER);

    const user = <User>await User.find(parseInt(id.toString(), 10));

    if (cookieBody.role === "Manager") {
      return res.status(200).json({success: true, data: user});
    }

    res.status(401).json({
      success: false,
      message: "You cannot access this endpoint.",
    });
  } catch (e) {
    return res.status(503).json({
      success: false,
      message: "Internal error.",
    });
  }
}
