const bcrypt = require("bcrypt");
const prisma = require("../../../config/prisma");
const { generateToken } = require("../../../utils/jwt");
const jwt = require('jsonwebtoken')

const signUpEmail = async ({
  email,
  verificationToken,
  password,
  fullName,
  ipAddress,
  operatingSystem,
  deviceType,
  deviceName,
  browser,
}) => {

  if (!verificationToken) {
    return {
      code: 401,
      msg: "Email verification required",
    };
  }

    let verifiedData;

  try {
    verifiedData = jwt.verify(
      verificationToken,
      process.env.JWT_SECRET
    );
  } catch (error) {
    return {
      code: 401,
      msg: "Invalid or expired verification token",
    };
  }

  // Token email and signup email must match
  if (
    verifiedData.email !== email ||
    verifiedData.purpose !== "EMAIL_VERIFICATION"
  ) {
    return {
      code: 401,
      msg: "Email verification failed",
    };
  }

    const existingUser = await prisma.signupdata.findUnique({
    where: { email: email },
  });

  

  if (existingUser) {
    return { code: 409, msg: "user Already exists " };
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await prisma.signupdata.create({
    data: {
      email: email,
      full_name: fullName,
      password_hash: hashedPassword,
      provider: "EMAIL",
      ip_address: ipAddress,
      operating_system: operatingSystem,
      device_type: deviceType,
      device_name: deviceName,
      browser: browser,
    },
  });

  const token = generateToken({
    userId: user.user_id,
    provider: user.provider,
  });

  return {
    code: 201,
    msg: "Signup successful",
    token,
  };
};

module.exports = signUpEmail
