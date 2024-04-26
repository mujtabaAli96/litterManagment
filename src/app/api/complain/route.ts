import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    
    try {
      const body = JSON.parse(req?.headers.get('custom-body'))||{};
      console.log("body bala",body?.name);

      // Handle picture upload (optional, see next step)
      const pictureUrl = ""; // Replace with picture upload logic (if needed)
      const complain = await prisma.complain.create({

        data: {
          "name":body?.name||"Default",
          "phone":body?.phone||"0900078601",
          "picture":body?.picture||"picture", // Set the actual picture URL here
          "location":body?.location||"0000000",
          "lat":body?.lat||"",
          "lang":body?.lang||"",
          "userId":body?.userId||"",
        },
      });
      return NextResponse.json(complain, {
        status: 200,
      });
      res.status(200).json({ complain });
    } catch (error) {
      console.error("Error creating complain:", error);
      res.status(500).json({ error: "Failed to create complain" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed!!" });
  }
}
