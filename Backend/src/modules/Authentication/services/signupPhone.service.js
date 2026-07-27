const bcrypt = require("bcrypt");
const prisma = require("../../../config/prisma");
const { generateToken } = require("../../../utils/jwt");


const SignUpphone = async ({
  phone,
  fullName,
  ipAddress,
  operatingSystem,
  deviceType,
  deviceName,
  browser,
}) => {
 
  
  const existingUser = await prisma.signupData.findUnique({
    where: { phone : phone },
  });

  if (existingUser) {
    return { code: 409, msg: "user Already exists " };
  }
  // const saltRounds = 10;
  // const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await prisma.signupData.create({
    data: {
      phone : phone,
      full_name: fullName,
      // password_hash: hashedPassword,
      provider: "PHONE",
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

module.exports = SignUpphone;