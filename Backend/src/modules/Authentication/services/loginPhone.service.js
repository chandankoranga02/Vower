const prisma = require("../../../config/prisma");
const { generateToken } = require("../../../utils/jwt");

const loginPhone = async ({ phone }) => {
  const existingUser = await prisma.signupdata.findUnique({
    where: { phone },
  });

  if (!existingUser) {
    return {
      code: 404,
      msg: "User not found",
    };
  }

  if (existingUser.provider !== "PHONE") {
    return {
      code: 400,
      msg: `Please login using ${existingUser.provider}`,
    };
  }

  const token = generateToken({
    userId: existingUser.user_id,
    provider: existingUser.provider,
  });

  return {
    code: 200,
    msg: "Login successful",
    token,
  };
};

module.exports = loginPhone;