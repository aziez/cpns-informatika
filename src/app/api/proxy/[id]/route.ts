import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  console.log("Query params:", { id });

  try {
    const response = await axios.get(
      `https://api-sscasn.bkn.go.id/2024/portal/spf/${id}`,
      {
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
