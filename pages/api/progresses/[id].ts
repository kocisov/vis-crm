import {NextApiRequest, NextApiResponse} from "next";
import {Progress} from "@/database/models/Progress";
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
    const progresses = <Array<Progress>>(
      await Progress.where({project_id: parseInt(id.toString(), 10)})
    );

    if (progresses.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    const first = progresses?.[0]?.project_id;
    const project = <Project>await Project.find(first);

    if (
      cookieBody.role === "Manager" ||
      cookieBody.role === "Employee" ||
      cookieBody.id === project.user_id
    ) {
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
    return res.status(503).json({
      success: false,
      message: "Internal error.",
    });
  }
}
