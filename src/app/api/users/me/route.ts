import { getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("X-USER-ID");

  if (!userId) {
    return getErrorResponse(
      401,
      "You are not logged in, please provide token to gain access"
    );
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  // const admin = await prisma.admin.findUnique({ where: { id: userId } });
// if(!user){
//   return NextResponse.json({
//     status: "success",
//     data: { user: { ...admin, password: undefined } },
//   });
// }
  return NextResponse.json({
    status: "success",
    data: { user: { ...user, password: undefined } },
  });
}
