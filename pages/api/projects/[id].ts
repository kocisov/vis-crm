import {NextApiRequest, NextApiResponse} from "next";
import {Project} from "@/database/models/Project";

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

    const project = <Project>await Project.find(parseInt(id.toString(), 10));

    if (cookieBody.role === "Manager" || cookieBody.id === project.id) {
      return res.status(200).json({success: true, data: project});
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
