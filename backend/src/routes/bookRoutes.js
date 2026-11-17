const express = require("express");

const {
  getBooks,
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  uploadCover,
} = require("../controllers/bookController");

const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getBooks);

router.get("/admin", protect, authorize("chief_editor"), getAllBooks);

router.post("/", protect, authorize("chief_editor"), createBook);

// Registered before the /:id routes. Raw body only for this route.
router.post(
  "/cover",
  protect,
  authorize("chief_editor"),
  express.raw({ type: ["image/jpeg", "image/png", "image/webp"], limit: "4mb" }),
  uploadCover
);

router.put("/:id", protect, authorize("chief_editor"), updateBook);

router.delete("/:id", protect, authorize("chief_editor"), deleteBook);

module.exports = router;