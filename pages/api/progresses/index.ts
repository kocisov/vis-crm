import {NextApiRequest, NextApiResponse} from "next";
import {Progress} from "@/database/models/Progress";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const {method, body, cookies} = await req;

    const hasAuthCookie = "CRM_USER" in cookies;

    if (!hasAuthCookie) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request.",
      });
    }

    const cookieBody = JSON.parse(cookies.CRM_USER);

    if (cookieBody.role === "Manager" || cookieBody.role === "Employee") {
      if (method === "POST") {
        const progress = new Progress();
        progress.message = body.message;
        progress.project_id = body.id;
        progress.percentage = body.percentage;
        const result = await progress.save();
        return res.status(200).json({
          success: true,
          message: "Created new Progress message.",
          result,
        });
      }

      const progresses = <Array<Progress>>await Progress.all();
      return res.status(200).json({
        success: true,
        data: progresses,
      });
    }

    res.status(401).json({
      success: false,
      message: "You cannot access this endpoint.",
    });
  } catch (e) {
    console.log(e.message);
    return res.status(503).json({
      success: false,
      message: "Internal error.",
    });
  }
}
