const bcrypt = require("bcrypt");
const prisma = require("../../config/prisma");
const { generateToken } = require("../../utils/jwt");

const signUpEmail = async ({
  email,
  password,
  fullName,
  ipAddress,
  operatingSystem,
  deviceType,
  deviceName,
  browser,
}) => {


  const existingUser = await prisma.signupData.findUnique({
    where: { email: email },
  });

  if (existingUser) {
    return { code: 409, msg: "user Already exists " };
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await prisma.signupData.create({
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

module.exports = {
  signUpEmail,
};
