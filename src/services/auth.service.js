// import bcrypt from "bcryptjs";
// import User from "../models/user.model.js";
// import generateToken from "../utils/generateToken.js";

// export const registerUser = async (data) => {
//   const { name, email, password } = data;

//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     throw new Error("User already exists");
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await User.create({
//     name,
//     email,
//     password: hashedPassword
//   });

//   const token = generateToken({
//     id: user._id,
//     role: user.role
//   });

//   return { user, token };
// };

// export const loginUser = async (data) => {
//   const { email, password } = data;

//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new Error("Invalid credentials");
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     throw new Error("Invalid credentials");
//   }

//   const token = generateToken({
//     id: user._id,
//     role: user.role
//   });

//   return { user, token };
// };
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (data) => {
  const { name, email, password } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  const token = generateToken({
    id: user._id,
    role: user.role
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  };
};

export const loginUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  if (!user.isVerified) {
  throw new Error("Please verify your email first");
}
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({
    id: user._id,
    role: user.role
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  };
};