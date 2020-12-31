import {NextApiRequest, NextApiResponse} from "next";
import {hash} from "argon2";
import {User} from "@/database/models/User";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const {method, cookies, body} = await req;

    const hasAuthCookie = "CRM_USER" in cookies;

    if (!hasAuthCookie) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request.",
      });
    }

    const cookieBody = JSON.parse(cookies.CRM_USER);

    if (cookieBody.role === "Manager") {
      if (method === "POST") {
        const {email, password, name, role} = body;

        const user = new User();
        user.email = email;
        user.password = await hash(password);
        user.name = name;
        user.role = role;
        const result = await user.save();

        return res
          .status(200)
          .json({success: true, message: "Created new user.", result});
      }

      return res
        .status(200)
        .json({success: false, message: "Error with creating new user."});
    }

    if (cookieBody.role === "Manager") {
      const users = <Array<User>>await User.all();
      return res.status(200).json({success: true, data: users});
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
