import jwt from "jsonwebtoken";
export const authUser = async (req, res, next) => {
  const { token,sellertoken } = req.cookies;
  // if(sellertoken)return;
  if (!token) {
    return res.status(400).json({ success: false, message: "Not authorized. Signup or Login to make purchase" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id) {
      req.userId = decoded.id;
      next();
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Not authorized" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
