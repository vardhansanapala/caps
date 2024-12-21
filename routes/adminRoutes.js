const express = require('express');
const { verifyToken, isSeller } = require('../middlewares/authMiddleware');
const {
    addCategory,
    addSubcategory,
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    deleteCategory,
    deleteSubcategory,
} = require('../controllers/productController');

const router = express.Router();

// Category and Subcategory Routes
router.post('/category', verifyToken, isSeller, addCategory);
router.delete('/category/:id', verifyToken, isSeller, deleteCategory); // DELETE category
router.post('/subcategory', verifyToken, isSeller, addSubcategory);
router.delete('/subcategory/:id', verifyToken, isSeller, deleteSubcategory); // DELETE subcategory

// Product Routes
router.post('/product', verifyToken, isSeller, addProduct);
router.get('/products', verifyToken, getProducts);
router.put('/product/:id', verifyToken, isSeller, updateProduct);
router.delete('/product/:id', verifyToken, isSeller, deleteProduct);

module.exports = router;
