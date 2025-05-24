import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(400).json({ success: false, message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    if (decoded.id) {
      req.body.userId = decoded.id;
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Not authorized" });
    }
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
