import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  const { sellertoken,token } = req.cookies;
  // if(token)return;
  if (!sellertoken) {
    return res.status(400).json({ success: false, message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(sellertoken, process.env.JWT_SECRET);
    if (decoded.email === process.env.SELLER_EMAIL) {
      next();
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export default authSeller;
