import user from "../models/user.js";

//update User CartData : /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const {  cartItems } = req.body;
    const userId=req.userId;
    await user.findByIdAndUpdate(userId, { cartItems });
    res.json({ success: true, message: "cart updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

// export const getCart = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const userData = await user.findById(userId);
//     res.json({ success: true, cartItems: userData.cartItems || {} });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };
