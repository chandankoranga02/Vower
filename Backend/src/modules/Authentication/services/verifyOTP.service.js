const bcrypt = require("bcrypt");
const prisma = require("../../../config/prisma");

const verifyOTP = async ({ email, otp }) => {
 
  const otpRecord = await prisma.emailOtp.findUnique({
    where: {
      email,
    },
  });

  
  if (!otpRecord) {
    return {
      code: 400,
      msg: "OTP not found. Please request a new OTP.",
    };
  }

 
  if (new Date() > otpRecord.expires_at) {
    // Expired OTP ko database se delete kar do
    await prisma.emailOtp.delete({
      where: {
        email,
      },
    });

    return {
      code: 400,
      msg: "OTP expired. Please request a new OTP.",
    };
  }

  
  const isOtpValid = await bcrypt.compare(
    otp.toString(),
    otpRecord.otp_hash
  );

  if (!isOtpValid) {
    return {
      code: 400,
      msg: "Invalid OTP",
    };
  }


  await prisma.emailOtp.delete({
    where: {
      email,
    },
  });

  const verificationToken = jwt.sign(
    {
      email,
      purpose: "EMAIL_VERIFICATION",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "10m",
    }
  );

  return {
    code: 200,
    msg: "Email verified successfully",
    verificationToken
  };
};

module.exports = verifyOTP;