const bcrypt = require("bcrypt");
const prisma = require("../../../config/prisma");
const { generateToken } = require("../../../utils/jwt");
const jwt = require('jsonwebtoken')

const resetPassword  = async ({
  email,
  password,
  verificationToken,
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
    verifiedData.purpose !== "RESET_PASSWORD"
  ) {
    return {
      code: 401,
      msg: "Reset password failed ",
    };
  }

const existingUser = await prisma.signupdata.findUnique({
    where: { email: email },
  });

  if (!existingUser) {
    return {
      msg :  " user with this email doesnt exists",
      code : 409,
    }
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

 await prisma.signupdata.update({
  where: {
    email,
  },
  data: {
    password_hash: hashedPassword,
  },
});

  const token = generateToken({
    userId: existingUser.user_id,
    provider: existingUser.provider,
  });

  return {
    code: 200,
    msg: "Password reset successful",
    token,
  };
};

module.exports = resetPassword; 
