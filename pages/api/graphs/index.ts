import {NextApiRequest, NextApiResponse} from "next";
import {getGraphsData} from "@/features/graphs/getGraphsData";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const {method, cookies} = await req;

    const hasAuthCookie = "CRM_USER" in cookies;

    if (!hasAuthCookie) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request.",
      });
    }

    const cookieBody = JSON.parse(cookies.CRM_USER);

    if (cookieBody.role === "Manager") {
      const data = await getGraphsData();

      return res.status(200).json({
        success: true,
        data,
      });
    }

    res.status(401).json({
      success: false,
      message: "You cannot access this endpoint.",
    });
  } catch (e) {
    console.log(e);
    return res.status(503).json({
      success: false,
      message: "Internal error.",
    });
  }
}
