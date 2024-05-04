import express from "express";
import formidable from "express-formidable";
const router = express.Router();

import {
  addProduct,
  updateProductDetails,
  deleteProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
} from "../controllers/productController.js";

import {
  authenticate,
  authorisedAdmin,
} from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorisedAdmin, formidable(), addProduct);

router.route("/allproducts").get(fetchAllProducts);
router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorisedAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorisedAdmin, deleteProduct);
export default router;
