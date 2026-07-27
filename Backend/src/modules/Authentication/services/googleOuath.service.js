const prisma = require("../../../config/prisma");
const googleClient = require("../../../config/googleOauth");
const { generateToken } = require("../../../utils/jwt");

const googleAuth = async ({
  idToken,
  ipAddress,
  operatingSystem,
  deviceType,
  deviceName,
  browser,
}) => {
  if (!idToken) {
    return {
      code: 400,
      msg: "Google ID token is required",
    };
  }

  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const {
    sub: googleId,
    email,
    name: fullName,
    picture,
    email_verified: emailVerified,
  } = payload;

  if (!email || !emailVerified) {
    return {
      code: 401,
      msg: "Google email is not verified",
    };
  }

  let user = await prisma.signupData.findUnique({
    where: {
      email,
    },
  });

  let isNewUser = false;

  if (!user) {
    user = await prisma.signupData.create({
      data: {
        email,
        full_name: fullName,
        provider: "GOOGLE",
        ip_address: ipAddress,
        operating_system: operatingSystem,
        device_type: deviceType,
        device_name: deviceName,
        browser,
      },
    });

    isNewUser = true;
  }

  const token = generateToken({
    userId: user.user_id,
    provider: user.provider,
  });

  return {
    code: 200,
    msg: isNewUser ? "Google signup successful" : "Google login successful",
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
