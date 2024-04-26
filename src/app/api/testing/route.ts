import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // const { id } = req.body; // Expect complain ID in request body
      const body = JSON.parse(req?.headers.get('custom-body'))||{};
      const id  = body.id; 
      console.log("body !nnn",body)

      if (!id) {
        return NextResponse.json( {
          status: 400,
          error: "Missing complain ID"
        });
        
        return res.status(400).json({ error: "Missing complain ID" });
      }

      const updatedComplain = await prisma.complain.update({
        where: { id },
        data: { status: 1 }, // Set status to 1 (solved)
      });
      return NextResponse.json(updatedComplain, {
        status: 200,
      });
      return res.status(200).json(updatedComplain);
    } catch (error) {
      console.error("Error updating complain:", error);
      return res.status(500).json({ error: "Failed to update complain" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed!" });
  }
}
