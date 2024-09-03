import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const offset = searchParams.get("offset");
  const limit = searchParams.get("limit");

  console.log("Query params:", { offset, limit });

  try {
    const response = await axios.get(
      `https://api-sscasn.bkn.go.id/2024/portal/spf`,
      {
        params: {
          kode_ref_pend: "5101087",
          offset,
          limit,
        },
        headers: {
          Origin: "https://sscasn.bkn.go.id",
        },
      }
    );

    return NextResponse.json({
      data: response.data,
      total: response.headers["x-total-count"]
        ? parseInt(response.headers["x-total-count"])
        : 0,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
