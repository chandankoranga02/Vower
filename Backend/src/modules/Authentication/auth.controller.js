const AuthService = require("./auth.service");
const { getDeviceInfo } = require("../../utils/deviceInfo");

const SignUpemail = async (req, res) =>{
    const {email , password , fullName} = req.body; 
    const result = await AuthService.signUpEmail({email, password , fullName ,...deviceInfo});
    return res.status(result.code).json({msg : result.msg , token :  result.token});
}


const SignUpphone = async (req, res) =>{
    const {phone , fullName} = req.body;
    const result = await AuthService.SignUpphone({phone, fullName , ...deviceInfo});
    return res.status(result.code).json({msg : result.msg});
}


const loginPhone = async (req, res) =>{
    const {phone} = req.body;
    const result = await AuthService.loginPhone({phone , ...deviceInfo});
    return res.status(result.code).json({msg : result.msg});
}


const loginEmail = async (req, res) =>{
     const {email , password} = req.body; 
     const result = await AuthService.loginEmail({email, password , ...deviceInfo});
    return res.status(result.code).json({msg : result.msg});
}

const googleAuth = async (req, res) =>{
     const {email} = req.body; 
     const result = await AuthService.googleAuth({email , ...deviceInfo});
    return res.status(result.code).json({msg : result.msg});
}


module.exports = {
    signUpEmail,
    signUpPhone,
    loginPhone,
    loginEmail
};