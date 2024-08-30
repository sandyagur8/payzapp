import { NextRequest, NextResponse } from "next/server";
import { supabase } from "~~/app/lib/supabase";

export const runtime = "edge";

type VerifyResponse = {
  success: boolean;
  message: string;
  isVerified?: boolean;
};

export async function GET(request: NextRequest): Promise<NextResponse<VerifyResponse>> {
  try {
    const url = new URL(request.url);
    const otp = url.searchParams.get("otp");
    const phoneNumber = url.searchParams.get("number");
    const method = url.searchParams.get("method");
    console.log({ phoneNumber });
    console.log({ phoneNumber });
    if (!otp) {
      return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 400 });
    }

    if (!method || (method !== "1" && method !== "2")) {
      return NextResponse.json({ success: false, message: "Invalid method" }, { status: 400 });
    }

    if (method === "1") {
      // Update OTP in the database
      const { error } = await supabase
        .from("verification")
        .insert({ otp, isVerified: false, PhoneNumber: phoneNumber });

      if (error) throw error;

      return NextResponse.json({ success: true, message: "OTP updated successfully" });
    } else {
      // Fetch OTP status from the database
      const { data, error } = await supabase.from("verification").select("isVerified").eq("otp", otp).single();

      if (error) throw error;

      if (!data) {
        return NextResponse.json({ success: false, message: "OTP not found" }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        message: "OTP status fetched successfully",
        isVerified: data.isVerified,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "failed" }, { status: 500 });
  }
}
