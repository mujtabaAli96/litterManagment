import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      let complains = await prisma.complain.findMany();
      if (complains) {
        complains = complains.filter(complain => complain.status == 0);
      }
      return NextResponse.json(complains, {
        status: 200,
      });
      return res.status(200).json(complains);
    } catch (error) {
      console.error("Error fetching complains:", error);
      return res.status(500).json({ error: "Failed to fetch complains" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed!" });
  }
}
