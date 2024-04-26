import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./lib/token";
import { getErrorResponse } from "./lib/helpers";

interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
  };
}

let redirectToLogin = false;
export async function middleware(req: NextRequest) {
  let token: string | undefined;
  const response = NextResponse.next();

  if (req.cookies.has("token")) {
    token = req.cookies.get("token")?.value;
  } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
    token = req.headers.get("Authorization")?.substring(7);
  }
  
  if (req.nextUrl.pathname.startsWith("/api/testing")){{
    const body = req.headers.get('content-type')?.includes('json')
    ? await req.json()
    : await req.text();
    console.log("body middleware : "); 
    const response = NextResponse.next();

    response.headers.set('custom-body', JSON.stringify(body)); // Set a custom header

        return response;
  }}
  if ((req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/adminLogin")) && (!token || redirectToLogin)){
    return;
  }
    // return;adminLogin

  if (
    !token &&
    (req.nextUrl.pathname.startsWith("/api/users") ||
      req.nextUrl.pathname.startsWith("/api/auth/logout"))
  ) {
    return getErrorResponse(
      401,
      "You are not logged in. Please provide a token to gain access."
    );
  }

 

  try {
    if (token) {
      const { sub } = await verifyJWT<{ sub: string }>(token);
      response.headers.set("X-USER-ID", sub);
      (req as AuthenticatedRequest).user = { id: sub };
      
    }
  } catch (error) {
    redirectToLogin = true;
    if (req.nextUrl.pathname.startsWith("/api")) {
      return getErrorResponse(401, "Token is invalid or user doesn't exists");
    }

    return NextResponse.redirect(
      new URL(`/login?${new URLSearchParams({ error: "badauth" })}`, req.url)
    );
  }

  const authUser = (req as AuthenticatedRequest).user;
  if (!authUser) {
    return NextResponse.redirect(
      new URL(
        `/login?${new URLSearchParams({
          error: "badauth",
          forceLogin: "true",
        })}`,
        req.url
      )
    );
  }

  if (req.nextUrl.pathname.startsWith("/api/complain")){
    // const authUser = (req as AuthenticatedRequest).user;

    const body = req.headers.get('content-type')?.includes('json')
    ? await req.json()
    : await req.text();
    // req.data = "Mujtaba";
    body['userId']=authUser?.id||'';
    console.log("body! : ",body); // Access the parsed body here
    console.log("i am herrrrr in complain")
    // return handler(req, res);
    const response = NextResponse.next();
    response.headers.set('custom-body', JSON.stringify(body)); // Set a custom header
    return response;
    return NextResponse.next();
  }
  if (req.nextUrl.pathname.startsWith("/api/getComplain")){{
    const response = NextResponse.next();
    response.headers.set('custom-header',authUser?.id ); // Set a custom header
    return response;
  }}
  if (req.nextUrl.pathname.startsWith("/api/getAllComplain")){{
    const response = NextResponse.next();
    response.headers.set('custom-header',authUser?.id ); // Set a custom header
    return response;
  }}
  if (req.nextUrl.pathname.startsWith("/api/testing")){{
    const body = req.headers.get('content-type')?.includes('json')
    ? await req.json()
    : await req.text();
    console.log("body middleware : "); 
    const response = NextResponse.next();

    response.headers.set('custom-body', JSON.stringify(body)); // Set a custom header

        return response;
  }}




  if (req.url.includes("/login") && authUser) {
    return NextResponse.redirect(new URL("/complain", req.url));
  }

  return response;
}

export const config = {
  matcher: [ "/login", "/api/users/:path*", "/api/auth/logout", "/api/complain","/api/testing","/adminLogin"],
};
