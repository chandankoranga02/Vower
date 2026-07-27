const bcrypt = require("bcrypt");
const prisma = require("../../../config/prisma");
const { generateToken } = require("../../../utils/jwt");

const loginEmail = async ({
  email,
  password,
}) => {
  const existingUser = await prisma.signupdata.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return {
      code: 404,
      msg: "User not found",
    };
  }

  if (existingUser.provider !== "EMAIL") {
    return {
      code: 400,
      msg: `Please login using ${existingUser.provider}`,
    };
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    existingUser.password_hash
  );

  if (!isPasswordValid) {
    return {
      code: 401,
      msg: "Invalid email or password",
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

module.exports = loginEmail;