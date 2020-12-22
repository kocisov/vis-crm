import {User} from "@/database/models/User";
import {NextApiRequest, NextApiResponse} from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const {cookies} = await req;
    const isLoggedIn = "CRM_USER" in cookies;

    if (isLoggedIn) {
      const data = JSON.parse(cookies.CRM_USER);
      const {id, name, email, role} = await User.find(data.id);
      return res.status(200).json({isLoggedIn: true, id, name, email, role});
    }

    res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  } catch (e) {
    res.status(403).json({
      success: false,
      isLoggedIn: false,
      message: "Unauthorized",
    });
  }
}
