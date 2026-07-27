const bcrypt = require("bcrypt");
const prisma = require("../../../config/prisma");
const { Resend } = require("resend");
const emailOtpTemplate = require("../../../utils/emailOtp.template");

const resend = new Resend(process.env.RESEND_API_KEY);

const SendOTP = async ({ email }) => {
  
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const otp = generateOTP();

 
  const saltRounds = 10;
  const hashedOtp = await bcrypt.hash(otp, saltRounds);

 
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  await prisma.emailOtp.upsert({
    where: {
      email,
    },

    update: {
      otp_hash: hashedOtp,
      expires_at: expiresAt,
    },

    create: {
      email,
      otp_hash: hashedOtp,
      expires_at: expiresAt,
    },
  });

  // 5. Send actual OTP through email
  const { data, error } = await resend.emails.send({
    from: "Vower <no-reply@appnests.in>",
    to: email,
    subject: "Verify your email - Vower",
    html: emailOtpTemplate(otp),
  });

  if (error) {
    console.error("Resend error:", error);

    throw new Error("Failed to send OTP");
  }

  return {
    code: 200,
    msg: "OTP sent successfully",
  };
};

module.exports = SendOTP;