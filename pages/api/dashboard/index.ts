import {NextApiRequest, NextApiResponse} from "next";
import {getGraphsData} from "@/features/graphs/getGraphsData";
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

    if (cookieBody.role === "Manager") {
      const projects = <Array<Project>>await Project.all();
      const notApproved = projects.filter((project) => !project.is_accepted);
      const price = notApproved.reduce(
        (prev, current) => prev + parseFloat(current.price),
        0
      );

      return res.status(200).json({
        success: true,
        data: {
          notApproved: notApproved.length,
          price,
        },
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
