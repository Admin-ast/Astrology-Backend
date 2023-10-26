const { default: mongoose } = require('mongoose');
const { Category } = require('../models/Category');
const { Product } = require('../models/Product');
const { count } = require('console');
const csv = require('csvtojson');
// const multer = require("multer");

// const storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, '/products/')
//         },
//         filename: function (req, file, cb){
//             const fileName = file.originalname.split(' ').join('-');
//             cb(null, fileName + '-' + Date.now())
//         }
// });
//  const uploadOptions = multer({ storage: storage })


const getProducts = async (req, res) => {
    console.log(req.query);
    let filter = {};
    if (req.query.categories) {
        filter = { category: req.query.categories.split(',') }
    }
    try {
        const productList = await Product.find(filter).populate('category');

        if (!productList) {
            return res.status(500).json({ status: false })
        }
        else {
            return res.status(200).json({ status: true, res: productList });
        }
    }
    catch (error) {
        console.log(error);
    }
}

const getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category');

    if (!product) {
        return res.status(500).json({ status: false, message: "Product not found" });
    }
    res.status(200).json({ status: true, res: product });
}
const addProduct = async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(400).send('Invalid Category');
    }
    let product = new Product({
        name: req.body.name,
        image: req.body.image,
        added_by: req.body.added_by,
        user_id: req.body.user_id,
        sku_id: req.body.sku_id,
        price: req.body.price,
        qty: req.body.qty,
        stock: req.body.stock,
        description: req.body.description,
        category: req.body.category,
        images: req.body.images,
        brand: req.body.brand,
        rating: req.body.rating,
        size: req.body.size,
        weight: req.body.weight,
        discount: req.body.discount

    });

    product = await product.save();
    if (!product) {
        return res.status(404).send('Product can not be created');
    }
    res.send(product);
}

const deleteProduct = async (req, res) => {
    Product.findByIdAndRemove(req.params.id).then(product => {
        if (product) {
            return res.status(200).json({ success: true, message: 'Product deleted' });
        }
        else {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err });
    });
}

const updateProduct = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id');
    }
    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(400).send('Invalid Category');
    }
    const product = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        image: req.body.image,
        added_by: req.body.added_by,
        added_by: req.body.added_by,
        user_id: req.body.user_id,
        sku_id: req.body.sku_id,
        price: req.body.price,
        qty: req.body.qty,
        stock: req.body.stock,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        rating: req.body.rating,
        size: req.body.size,
        weight: req.body.weight,
        discount: req.body.discount
    },
        { new: true }

    );

    if (!product) {
        return res.status(404).send('Product can not be updated');
    }
    res.send(product);
}

const productCount = async (req, res) => {
    const productotal = await Product.countDocuments((count) => count);

    if (!productotal) {
        return res.status(500).json({ message: "Product not found" });
    }
    res.status(200).send({ productCount: productotal });
}


const productImport = async (req, res) => {
    const csvFilePath = '/var/www/html/astrology/product.csv';

    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            // console.log(jsonObj);
            for (var x = 0; x < jsonObj.length; x++) {
                temp = parseFloat(jsonObj[x].price);
                tempurl = jsonObj[x].image.slice(8);
                tempurl = "https://s3.us-east-1.amazonaws.com/" + tempurl;


                jsonObj[x].price = temp;
                jsonObj[x].image = tempurl;


            }
            // console.log(jsonObj[0]);
            Product.insertMany(jsonObj, (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ success: false, error: err });
                }
                else {
                    return res.status(200).json({ success: true, message: "data imported successfully" });
                }
            })
        });
}

const deleteallproducts = async (req, res) => {
    await Product.deleteMany({});

    res.status(200).json({ status: true, message: "all products deleted" });
}
module.exports = {
    getProducts,
    addProduct,
    deleteProduct,
    getProduct,
    updateProduct,
    productCount,
    productImport,
    deleteallproducts
}