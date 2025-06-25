import { NextRequest, NextResponse } from "next/server";

const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY as string;
const UPLOAD_ENDPOINT = "https://api.assemblyai.com/v2/upload";

export async function POST(req: NextRequest) {
  console.log("🔑 Loaded AssemblyAI key:", ASSEMBLYAI_API_KEY);

  const formData = await req.formData();
  const audioBlob = formData.get("audio");

  if (!audioBlob || typeof audioBlob === "string") {
    return NextResponse.json({ error: "Invalid audio file" }, { status: 400 });
  }

  try {
    // Convert Blob to ArrayBuffer before uploading
    const audioBuffer = await (audioBlob as Blob).arrayBuffer();

    const uploadRes = await fetch(UPLOAD_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ASSEMBLYAI_API_KEY}`,
        "Content-Type": "application/octet-stream",
      },
      body: audioBuffer,
    });

    const rawBody = await uploadRes.text();

    if (!uploadRes.ok) {
      console.error("Upload failed:", rawBody);
      return NextResponse.json({ error: "Upload failed: " + rawBody }, { status: 500 });
    }

    let uploadData;
    try {
      uploadData = JSON.parse(rawBody);
    } catch (jsonErr) {
      return NextResponse.json({ error: "Upload failed: Invalid JSON" }, { status: 500 });
    }

    console.log("✅ Upload URL:", uploadData.upload_url);

    return NextResponse.json({ uploadUrl: uploadData.upload_url });
  } catch (error: unknown) {
  const message = error instanceof Error ? error.message : "Unknown error";
  console.error("Fetch error:", error);
  return NextResponse.json({ error: "Fetch failed: " + message }, { status: 500 });
}
}
