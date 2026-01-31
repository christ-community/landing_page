import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validate input
    if (!username || !password) { 
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Get credentials from environment
    const envUsername = process.env.DASHBOARD_USERNAME;
    const envPasswordHash = process.env.DASHBOARD_PASSWORD_HASH;

    if (!envUsername || !envPasswordHash) {
      console.error("Dashboard credentials not configured");
      return NextResponse.json(
        { error: "Authentication not configured" },
        { status: 500 }
      );
    }

    // Verify credentials
    const usernameMatch = username === envUsername;
    console.log("Comparing password:", password, "with hash:", envPasswordHash);
    const passwordMatch =
      password === envPasswordHash
        ? true
        : await bcrypt.compare(password, envPasswordHash);

    if (!usernameMatch || !passwordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate session token (simple approach - in production use JWT)
    const sessionToken = Buffer.from(`${username}:${Date.now()}`).toString(
      "base64"
    );

    // Return success with token
    const response = NextResponse.json(
      {
        success: true,
        message: "Authentication successful",
      },
      { status: 200 }
    );

    // Set secure cookie
    response.cookies.set("dashboard-session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Verify session endpoint
export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("dashboard-session")?.value;

    if (!sessionToken) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Verify token is not too old (24 hours)
    try {
      const decoded = Buffer.from(sessionToken, "base64").toString("utf-8");
      const [, timestamp] = decoded.split(":");
      const tokenAge = Date.now() - parseInt(timestamp);
      const maxAge = 60 * 60 * 24 * 1000; // 24 hours in ms

      if (tokenAge > maxAge) {
        return NextResponse.json(
          { authenticated: false, reason: "Session expired" },
          { status: 401 }
        );
      }

      return NextResponse.json({ authenticated: true }, { status: 200 });
    } catch {
      return NextResponse.json(
        { authenticated: false, reason: "Invalid session" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Session verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Logout endpoint
export async function DELETE() {
  const response = NextResponse.json(
    { success: true, message: "Logged out successfully" },
    { status: 200 }
  );

  // Clear session cookie
  response.cookies.delete("dashboard-session");

  return response;
}
