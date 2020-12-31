import {NextApiRequest, NextApiResponse} from "next";
import {Project} from "@/database/models/Project";

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

    const projectsRaw = <Array<Project>>(
      await Project.where({user_id: cookieBody.id})
    );

    const projects = Array.isArray(projectsRaw) ? projectsRaw : [projectsRaw];

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (e) {
    return res.status(503).json({
      success: false,
      message: "Internal error.",
    });
  }
}
