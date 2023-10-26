const {Cart} = require('../models/cart');
const {CartItem} = require('../models/cartitem');
const {getuserid} = require('../utils/jwt');



const addtocart = async(req,res) => {
    
    const cartItemsIds  = Promise.all(req.body.map(async cartItem => {
        
        
        let newCartItem = new CartItem({
            qty: parseInt(cartItem.quantity),
            product:  cartItem.product
        });


        newCartItem = await newCartItem.save();

        return newCartItem._id;
 }));

 const cartItemsId = await cartItemsIds;
  let user = "";
  if(req.body.user){
    user = req.body.user;
  }
  else{
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
      }
      // check cookies
      else if (req.cookies.token) {
        token = req.cookies.token;
      }
    user = getuserid(token);
  }
 
  let cart = new Cart({
     cartItems: cartItemsId,
     user: user
 });
   
  cart = await cart.save();

  if(!cart){
    return res.status(404).send('Cart not created');
  }
  
  res.status(200).json({success:true, message:'Cart Created'});
}

const getCart = async(req,res) => {
  let user = "";
  if(req.body.user){
    user = req.body.user;
  }
  else{
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
      }
      // check cookies
      else if (req.cookies.token) {
        token = req.cookies.token;
      }
    user = getuserid(token);
  }
      const cart = await Cart.find({user:user}).populate({path:'cartItems', populate:'product'});
      if(!cart){
        return res.status(404).send('Cart not found');
      }
      res.status(200).json({success:true, message: 'Cart', cart:cart });

}
const updateCart = async(req,res) => {
        const cartItem = await CartItem.findByIdAndUpdate(req.params.id,{
            quantity: req.body.quantity
        },
        { new : true}
        );

        if(!cartItem){
            res.status(500).json({success:false, message: 'Cart can not updated'})
        }

        const cart = await Cart.findById(req.body.cartid).populate({ path: 'cartItems', populate: 'product'});

        res.status(200).json({success:true, message: 'Cart Items Updated', cart: cart});
}

const deleteCartItem = async(req,res) => {
      const cartItem = await CartItem.findByIdAndRemove(req.params.id);

      if(!cartItem){
        res.status(500).json({success:false, message: 'Cart can not removed'});
      }
      
      const cart = await Cart.findById(req.body.cartid).populate({ path: 'cartItems', populate: 'product'});

    res.status(200).json({success:true, message: 'Cart Items Updated', cart: cart});
}   

const emptyCart = async(req,res) => {
    Cart.findByIdAndRemove(req.params.id).then(async cart => {
        if(cart){
            await cart.CartItems.map(async cartItem => {
                  await CartItem.findByIdAndRemove(cartItem);  
            });
            return res.status(200).json({success:true, message:'Cart has been deleted'})
        }
        else{
            return res.status(400).json({success:false, message:'Cart not found'});
        }


}).catch(err => {
        return res.status(500).json({success:false, error: err});
});
}

module.exports = {

    addtocart,
    updateCart,
    deleteCartItem,
    emptyCart,
    getCart
}

