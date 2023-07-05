const express = require("express");
const router = express.Router();
const products = require("../controllers/product.controller");

// Create a new product
router.post("/", products.create);

// Retrieve all products
router.get("/", products.findAll);

// Retrieve all published products
router.get("/published", products.findAllPublished);

// Retrieve a single product by ID
router.get("/:id", products.findOne);

// Update a product by ID
router.put("/:id", products.update);

// Delete a product by ID
router.delete("/:id", products.delete);

// Delete all products
router.delete("/", products.deleteAll);

module.exports = router;
