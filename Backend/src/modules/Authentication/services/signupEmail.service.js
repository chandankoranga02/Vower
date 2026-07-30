const bcrypt = require("bcrypt");
const prisma = require("../../../config/prisma");
const { generateToken } = require("../../../utils/jwt");
const jwt = require('jsonwebtoken')
const generateID = require("../../../utils/IDgenerator")

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
  const userID = generateID("US");
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

const [, appUser] = await prisma.$transaction([
  prisma.signupdata.create({
    data: {
      user_id: userID,
      email,
      full_name: fullName,
      password_hash: hashedPassword,
      provider: "EMAIL",
      ip_address: ipAddress,
      operating_system: operatingSystem,
      device_type: deviceType,
      device_name: deviceName,
      browser,
    },
  }),

  prisma.user.create({
    data: {
      user_id: userID,
      fullName,
      email,
      provider: "EMAIL",
    },
  }),
]);

  const token = generateToken({
    userId: appUser.user_id,
    provider: appUser.provider,
  });

  return {
    code: 201,
    msg: "Signup successful",
    token,
  };
};

module.exports = signUpEmail
