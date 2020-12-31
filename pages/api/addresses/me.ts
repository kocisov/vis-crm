import {NextApiRequest, NextApiResponse} from "next";
import {Address} from "@/database/models/Address";

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

    const addressesRaw = <Array<Address>>(
      await Address.where({user_id: cookieBody.id})
    );

    const addresses = Array.isArray(addressesRaw)
      ? addressesRaw
      : [addressesRaw];

    return res.status(200).json({
      success: true,
      data: addresses,
    });
  } catch (e) {
    return res.status(503).json({
      success: false,
      message: "Internal error.",
    });
  }
}
