const prisma = require("../../../config/prisma");
const { generateToken } = require("../../../utils/jwt");

const googleAuth = async ({
  accessToken,
  ipAddress,
  operatingSystem,
  deviceType,
  deviceName,
  browser,
}) => {
  if (!accessToken) {
    return {
      code: 400,
      msg: "Google access token is required",
    };
  }

  // Fetch user profile from Google using the access token
  let googleUser;
  try {
    const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      return {
        code: 401,
        msg: "Invalid or expired Google access token",
      };
    }

    googleUser = await response.json();
  } catch (err) {
    return {
      code: 401,
      msg: "Failed to verify Google token",
    };
  }

  const {
    sub: googleId,
    email,
    name: fullName,
    picture,
    email_verified: emailVerified,
  } = googleUser;

  if (!email || !emailVerified) {
    return {
      code: 401,
      msg: "Google email is not verified",
    };
  }

  // Check if user already exists by email or google_id
  let user = await prisma.signupdata.findFirst({
    where: {
      OR: [{ email }, { google_id: googleId }],
    },
  });

  let isNewUser = false;

  if (!user) {
    // New user — create account in DB
    user = await prisma.signupdata.create({
      data: {
        email,
        full_name: fullName,
        google_id: googleId,
        provider: "GOOGLE",
        ip_address: ipAddress,
        operating_system: operatingSystem,
        device_type: deviceType,
        device_name: deviceName,
        browser,
      },
    });

    isNewUser = true;
  } else if (!user.google_id) {
    // Existing account (email/phone) — link their Google ID
    user = await prisma.signupdata.update({
      where: { user_id: user.user_id },
      data: { google_id: googleId },
    });
  }

  const token = generateToken({
    userId: user.user_id,
    provider: user.provider,
  });

  return {
    code: 200,
    msg: isNewUser
      ? "Account created successfully. Welcome to Vower!"
      : "Signed in successfully. Welcome back!",
    token,
    user: {
      userId: user.user_id,
      email: user.email,
      fullName: user.full_name,
      picture,
    },
  };
};

module.exports = googleAuth;
