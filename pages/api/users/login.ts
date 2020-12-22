import {NextApiRequest, NextApiResponse} from "next";
import {verify} from "argon2";
import {serializeAuthCookie} from "@/features/cookies/serializeAuthCookie";
import {User} from "@/database/models/User";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const {email, password} = await req.body;

    if (!email || !password) {
      return res.status(422).json({
        success: false,
        message: "Email or Password is missing.",
      });
    }

    const user = await User.where({email});

    if (!Array.isArray(user) && typeof user !== "string") {
      const validPassword = await verify(user.password ?? "", password);

      if (!validPassword) {
        return res.status(401).json({
          success: false,
          message: "Invalid password.",
        });
      }

      const {id, role} = user;

      const cookie = serializeAuthCookie({
        id,
        role,
      });

      res.setHeader("Set-Cookie", cookie);

      return res.status(200).json({
        success: true,
        isLoggedIn: true,
      });
    }

    return res.status(503).json({
      success: false,
      message: "Internal error.",
    });
  } catch (e) {
    res.status(404).json({
      success: false,
      message: "User not found.",
    });
  }
}
