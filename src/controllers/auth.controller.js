import { registerUser, loginUser } from "../services/auth.service.js";
import User from "../models/user.model.js";
import {generateOTP} from "../utils/generateOTP.js";
import { sendOtpEmail } from "../utils/sendEmail.js";
/**
 * Register Controller
 */
// export const register = async (req, res) => {
//   try {
//     const result = await registerUser(req.body);
//     const otp = generateOTP();
//     const user = await User.findById(result._id);
//     user.otp = otp;
//     user.otpExpires = Date.now() + 5 * 60 * 1000;
//     await user.save();
//     await sendOtpEmail(user.email, otp);
//     console.log("registration block entered",req.body);
//     return res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       data: result,
//     });
//   } catch (error) {
//     console.log("registration error:",error.message);
//     return res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
export const register = async (req, res) => {
  try {
    // Everything happens inside registerUser now
    const result = await registerUser(req.body);

    // Send the email using the data returned
    await sendOtpEmail(result.user.email, result.user.otp);

    return res.status(201).json({
      success: true,
      message: "Registration successful. OTP sent to email",
      data: result
    });

  } catch (error) {
    console.error("Registration Error:", error.message);
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
/**
 * Login Controller
 */
// export const login = async (req, res) => {
//   try {
//     const result = await loginUser(req.body);
//     console.log("login block entered",req.body);
//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       //data: result,
//       data: {
//     token,
//     role: user.role,
//     name: user.name,
//     email: user.email
//   }
//     });
  
//   } catch (error) {
//     console.log("login error:",error.message);
//     return res.status(401).json({
      
//       success: false,
//       message: error.message,
//     });
//   }
// };

// verify otp controller

export const verifyOTP = async (req,res)=>{
  try{
    const {email,otp} = req.body;
    const user = await User.findOne({email});

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    if(user.otp !== otp){
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }
    if(user.otpExpires < Date.now()){
      return res.status(400).json({
        success: false,
        message: "OTP expired"
      });
    }
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully"
    });
  }catch(error){
    return res.status(500).json({
      success: false,
      message: "OTP verification failed"
    });
  }
}
export const resendOTP = async (req, res) => {
  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User already verified"
      });
    }

    // generate new OTP
    const otp = generateOTP();

    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;

    await user.save();

    // send email
    await sendOtpEmail(user.email, otp);

    return res.status(200).json({
      success: true,
      message: "OTP resent successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Failed to resend OTP"
    });

  }
};
export const login = async (req, res) => {
  try {
    console.log("login block entered", req.body);

    const result = await loginUser(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,   // ✅ send what service returned
    });

  } catch (error) {
    console.log("login error:", error.message);

    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
export const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user"
    });
  }
};