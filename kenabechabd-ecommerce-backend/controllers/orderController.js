import Order from "../models/order.js";
import Product from "../models/product.js";

//place order : /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const { items, address } = req.body;
    const  userId = req.userId;
    console.log(userId);
    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);
    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });
     return res.json({
        success:true,
        message:'Order placed successfully'
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
        success:false,
        message:error.message
    });
  }
};

//Get orders by userId : /api/order/user
export const getUserOrders=async(req,res)=>{
    try {
        const {userId}=req;
        const orders=await Order.find({
            userId,
            $or:[{paymentType:'COD'},{isPaid:true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({success:true,orders});
    } catch (error) {
        res.json({succes:false,message:error.message});
    }
}

//get all orders (for seller / admin) : /api/order/seller
export const getAllOrders=async(req,res)=>{
    try {  
        const orders=await Order.find({ 
            $or:[{paymentType:'COD'},{isPaid:true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({success:true,orders});
    } catch (error) {
        res.json({succes:false,message:error.message});
    }
}