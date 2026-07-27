const signUpEmailService = require("./services/signupEmail.service");
const signUpPhoneService = require("./services/signupPhone.service");
const loginEmailService = require("./services/loginEmail.service");
const loginPhoneService = require("./services/loginPhone.service");
const sendOTPService = require("./services/sendOTP.service");
const verifyOTPService = require("./services/verifyOTP.service");
const googleAuthService = require("./services/googleOuath.service");

const { getDeviceInfo } = require("../../utils/DeviceInfo");

const signUpEmail = async (req, res) => {
  try {
    const { email, password, fullName, verificationToken } = req.body;
    const deviceInfo = getDeviceInfo(req);
    const result = await signUpEmailService({
      email,
      password,
      fullName,
      verificationToken,
      ...deviceInfo,
    });

    return res.status(result.code).json({
      msg: result.msg,
      token: result.token,
    });
  } catch (error) {
    console.error("Email signup error:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const signUpPhone = async (req, res) => {
  try {
    const { phone, fullName } = req.body;
    const deviceInfo = getDeviceInfo(req);

    const result = await signUpPhoneService({
      phone,
      fullName,
      ...deviceInfo,
    });

    return res.status(result.code).json({
      msg: result.msg,
      token: result.token,
    });
  } catch (error) {
    console.error("Phone signup error:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const loginEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginEmailService({
      email,
      password,
    });

    return res.status(result.code).json({
      msg: result.msg,
      token: result.token,
    });
  } catch (error) {
    console.error("Email login error:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const loginPhone = async (req, res) => {
  try {
    const { phone } = req.body;
    const result = await loginPhoneService({ phone });

    return res.status(result.code).json({
      msg: result.msg,
      token: result.token,
    });
  } catch (error) {
    console.error("Phone login error:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await sendOTPService({ email });
    return res.status(result.code).json({
      msg: result.msg,
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    return res.status(500).json({ msg: "Failed to send OTP" });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const result = await verifyOTPService({
      email,
      otp,
    });

    return res.status(result.code).json({
      msg: result.msg,
      verificationToken: result.verificationToken,
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const googleAuth = async (req, res) => {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      return res.status(400).json({
        msg: "Google access token is required",
      });
    }

    const deviceInfo = getDeviceInfo(req);

    const result = await googleAuthService({
      accessToken,
      ...deviceInfo,
    });

    return res.status(result.code).json({
      msg: result.msg,
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    console.error("Google OAuth error:", error);
    return res.status(401).json({
      msg: "Google authentication failed",
    });
  }
};

module.exports = {
  signUpEmail,
  signUpPhone,
  loginEmail,
  loginPhone,
  sendOTP,
  verifyOTP,
  googleAuth,
};