const { Order } = require('../models/order');
const { OrderItem } = require('../models/orderitem');
const { getuserid } = require('../utils/jwt');

const getOrders = async (req, res) => {
    const orderList = await Order.find().populate('orderItems').sort({ 'dateOrdered': -1 });

    if (!orderList) {
        res.status(500).json({ success: false, message: "No Orders" });
    }

    res.status(200).json({ success: true, res: orderList });
}

const getOrder = async (req, res) => {
    const order = await Order.findById(req.params.id).populate({ path: 'orderItems', populate: 'product' });

    if (!order) {
        res.status(500).json({ success: false, message: "No Orders" });
    }

    res.send(order);
}

const addOrder = async (req, res) => {
    let user = "";
    try {

        if (req.body.user) {
            user = req.body.user;
        }
        else {

            user = getuserid(req);
            

        }
    } catch (error) {
        res.status(400).json(error);
    }
    
    //console.log(req.body);
    const orderItemsIds = Promise.all(req.body.orderItems.map(async orderItem => {
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }));
    // console.log('ok');
    const orderItemsId = await orderItemsIds;

    const totalPrices = await Promise.all(orderItemsId.map(async (orderItemId) => {
        //  console.log(orderItemId);
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
        //console.log(orderItem.product);
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
    }));

    req.body.status = "Pending";
    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
    console.log(totalPrice);
    try {

        let orderplaced = new Order({
            orderItems: orderItemsId,
            shippingAddress: req.body.address,
            status: req.body.status,
            totalPrice: totalPrice,
            user: user

        });

        orderplaced = await orderplaced.save();
    }
    catch (error) {
        console.log(error);
    
    if (!orderplaced) {
        return res.status(404).json({ status: false, message: "Order can not be created" });
    }
    }
    res.status(200).json({ status: true, message: "Order Successfully Placed" });
}

const updateOrder = async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    },
        { new: true }
    );

    if (!order) {
        res.status(500).json({ success: false, message: "Order can not be updated" });
    }

    res.send(order);
}

const deleteOrder = async (req, res) => {
    Order.findByIdAndRemove(req.params.id).then(async order => {
        if (order) {
            await order.OrderItems.map(async orderItem => {
                await OrderItem.findByIdAndRemove(orderItem);
            });
            return res.status(200).json({ success: true, message: 'Order has been deleted' })
        }
        else {
            return res.status(400).json({ success: false, message: 'Order not found' });
        }


    }).catch(err => {
        return res.status(500).json({ success: false, error: err });
    });
}

const orderTotal = async (req, res) => {
    const ordertotal = await Order.aggregate([
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ])

    if (!ordertotal) {
        return res.status(400).send('Order Total can not be generated');
    }

    res.send({ ordertotal: ordertotal.pop().total });

}

const orderCount = async (req, res) => {
    const ordertotal = await Order.countDocuments((count) => count);

    if (!ordertotal) {
        return res.status(500).json({ message: "Product not found" });
    }
    res.status(200).send({ orderCount: ordertotal });
}

const getUserOrders = async (req, res) => {

    let user = "";
    if (req.body.user) {
        user = req.body.user;
    }
    else {
        let token;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
        }
        // check cookies
        else if (req.signedCookies.accessToken) {
            token = req.signedCookies.accessToken;
        }
        user = getuserid(token);
        console.log(user);
    }
    console.log(user);
    const userOrderList = await Order.find({ user: user }).populate({ path: 'orderItems', populate: 'product' }).sort({ 'dateOrdered': -1 });
    if (!userOrderList) {
        res.status(500).json({ status: false, message: "No Orders" });
    }

    res.status(200).json({ status: true, res: userOrderList });
}

const findorderItems = async (req, res) => {
    const orderItem = await OrderItem.findById('651e366d48bb49adfe235e3f').populate('product', 'price');
    console.log(orderItem.product.price);
    return res.send(orderItem);
}
module.exports = {
    getOrders,
    addOrder,
    getOrder,
    updateOrder,
    deleteOrder,
    orderTotal,
    orderCount,
    getUserOrders,
    findorderItems
}