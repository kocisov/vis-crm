import {NextApiRequest, NextApiResponse} from "next";
import {data, drop, tables} from "@/features/seeder/functions";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const {ref, count} = await req.query;
  const normalizedCount = count ? parseInt(count as string, 10) : 50;

  if (ref === "full") {
    await drop();
    await tables();
    const inserted = await data(normalizedCount);
    return res.status(200).json({
      success: true,
      message: `Created tables, inserted ${inserted} fields.`,
    });
  }

  if (ref === "tables") {
    await tables();
    return res.status(200).json({success: true, message: "Created tables."});
  }

  if (ref === "data") {
    const inserted = await data(normalizedCount);
    return res.status(200).json({
      success: true,
      message: `Created tables, inserted ${inserted} fields.`,
    });
  }

  if (ref === "drop") {
    await drop();
    return res
      .status(200)
      .json({success: true, message: "Dropped tables and data."});
  }

  res.status(503).json({success: false, message: "Unrecognized operation."});
}
