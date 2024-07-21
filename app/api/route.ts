import { getUserByClerkId } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const queryString = searchParams.get("query");

  // Check if queryString is null
  if (!queryString) {
    return new NextResponse("No query parameter provided", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  // Fetch the user data using the parsed query
  const result = await getUserByClerkId(queryString);

  if (result) {
    return new NextResponse(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return new NextResponse("User not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
