import jwt from "jsonwebtoken";

//Login seller : api/seller/Login
export const sellerLogin = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    if (
      process.env.SELLER_EMAIL === email &&
      process.env.SELLER_PASSWORD === password
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("sellertoken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      return res.json({ success: true, message: "logged in" });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } else {
    return res
      .status(400)
      .json({ success: false, message: "all fields are required" });
  }
};

//seller isAuth : /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
  try {
    return res.status(200).json({success: true});
  } catch (error) {
    console.log(1);
    return res.status(400).json({ success: false, message: error.message });
  }
};

//Logout seller : /api/seller/logout
export const sellerlogout = async (req, res) => {
  try {
    res.clearCookie("sellertoken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.status(405).json({ success: false, message: error.message });
  }
};
