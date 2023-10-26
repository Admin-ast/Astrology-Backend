const {Category} = require('../models/Category');

const getCategories = async(req,res) => {
        const categoryList = await Category.find();

        if(!categoryList){
        return    res.status(500).json({success:false})
        }
        else{
         return   res.status(200).json({success:true,status:200,res:categoryList});
        }
}

const getCategory = async(req,res) => {
        const category = await Category.findById(req.params.id);
        if(!category){
            return res.status(500).json({message:"Category not found"});
        }
        res.status(200).send(category);
}
const addCategory = async(req,res) => {
       let category = new Category({
            name: req.body.name,
            image: req.body.image
       });

       category = await category.save();
       if(!category){
        return res.status(404).send('Category can not be created');
       }
       res.send(category);
}

const deleteCategory = async(req,res) => {
        Category.findByIdAndRemove(req.params.id).then(category => {
            if(category){
                return res.status(200).json({success:true,message:'Category deleted'});
            }
            else{
                return res.status(404).json({success:false, message:"Category not found"});
            }
        }).catch(err => {
               return res.status(400).json({success:false,error : err}); 
        });
}

const updateCategory = async(req,res) => {
        const category = await Category.findByIdAndUpdate(req.params.id,{
               name:req.body.name,
               image:req.body.image
        });

        if(!category){
            return res.status(404).send('Category can not be edited');
           }
           res.send(category);
}

module.exports = {
    getCategories,
    addCategory,
    deleteCategory,
    getCategory,
    updateCategory
}