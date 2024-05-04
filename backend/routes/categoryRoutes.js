import express from "express";
const router = express.Router();
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";

import {
  authenticate,
  authorisedAdmin,
} from "../middlewares/authMiddleware.js";

router.route("/").post(authenticate, authorisedAdmin, createCategory);
router.route("/:categoryId").put(authenticate, authorisedAdmin, updateCategory);
router
  .route("/:categoryId")
  .delete(authenticate, authorisedAdmin, removeCategory);

router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);

export default router;
