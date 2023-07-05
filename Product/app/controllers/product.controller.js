const db = require("../models");
const Product = db.products;

// Create a new product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.description || !req.body.price || !req.body.category) {
    res.status(400).send({ message: "Please provide all required fields." });
    return;
  }

  // Create a Product
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    published: req.body.published || false
  });

  // Save Product in the database
  product
    .save(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the product."
      });
    });
};

// Retrieve all Products from the database
exports.findAll = (req, res) => {
  const name = req.query.name;
  const condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Product.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving products."
      });
    });
};

// Retrieve a single Product by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: "Product not found." });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving Product with id=" + id });
    });
};

// Update a Product by ID
exports.update = (req, res) => {
  const id = req.params.id;

  Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Product not found with id=${id}.` });
      } else {
        res.send({ message: "Product updated successfully." });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error updating Product with id=" + id });
    });
};

// Delete a Product by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Product not found with id=${id}.` });
      } else {
        res.send({ message: "Product deleted successfully." });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error deleting Product with id=" + id });
    });
};

// Delete all Products from the database
exports.deleteAll = (req, res) => {
  Product.deleteMany({})
    .then(data => {
      res.send({ message: `${data.deletedCount} Products deleted successfully.` });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while deleting all products." });
    });
};

// Retrieve all published Products
exports.findAllPublished = (req, res) => {
  Product.find({ published: true })
}