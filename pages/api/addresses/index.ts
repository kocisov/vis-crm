import {NextApiRequest, NextApiResponse} from "next";
import {Address} from "@/database/models/Address";

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

    if (method === "POST") {
      const address = new Address();
      address.city = body.city;
      address.street = body.street;
      address.postal_code = body.postal;
      address.province = body.province;
      address.type = body.typ;
      address.user_id = cookieBody.id;
      address.active = body.active;
      const result = await address.save();
      return res.status(200).json({
        success: true,
        message: "Created new Address.",
        result,
      });
    }

    if (cookieBody.role === "Manager") {
      const addresses = <Array<Address>>await Address.all();
      return res.status(200).json({
        success: true,
        data: addresses,
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
