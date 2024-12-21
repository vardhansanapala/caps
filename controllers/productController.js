const Category = require('../models/category');
const Subcategory = require('../models/Subcategory');
const Product = require('../models/product');
const cloudinary = require('../utils/cloudinary');

// Add Category
exports.addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.create({ name });
        res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add Subcategory
exports.addSubcategory = async (req, res) => {
    try {
        const { name, categoryId } = req.body;
        const subcategory = await Subcategory.create({ name, category: categoryId });
        const category = await Category.findById(categoryId);
        category.subcategories.push(subcategory._id);
        await category.save();
        res.status(201).json({ message: 'Subcategory created successfully', subcategory });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add Product
exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, discount, subcategoryId } = req.body;

        let imageUrl = null;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }

        const product = await Product.create({
            name,
            description,
            price,
            discount,
            imageUrl,
            subcategory: subcategoryId,
        });

        const subcategory = await Subcategory.findById(subcategoryId);
        subcategory.products.push(product._id);
        await subcategory.save();

        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get Products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('subcategory');
        res.status(200).json({ products });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, discount } = req.body;
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, discount },
            { new: true }
        );
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        // Delete all associated subcategories
        await Subcategory.deleteMany({ category: category._id });

        await category.remove();
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Subcategory
exports.deleteSubcategory = async (req, res) => {
    try {
        const subcategory = await Subcategory.findById(req.params.id);
        if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });

        // Remove subcategory reference from category
        const category = await Category.findById(subcategory.category);
        category.subcategories.pull(subcategory._id);
        await category.save();

        await subcategory.remove();
        res.status(200).json({ message: 'Subcategory deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
