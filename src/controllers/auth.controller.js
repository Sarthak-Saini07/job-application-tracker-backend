import { registerUser, loginUser } from "../services/auth.service.js";

/**
 * Register Controller
 */
export const register = async (req, res) => {
  try {
    const result = await registerUser(req.body);
    console.log("registration block entered",req.body);
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    console.log("registration error:",error.message);
    return res.status(400).json({
      success: false,
      message: error.message,
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