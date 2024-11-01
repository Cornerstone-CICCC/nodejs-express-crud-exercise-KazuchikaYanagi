"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const productRouter = (0, express_1.Router)();
let products = [];
productRouter.get("/products", (req, res) => {
    res.status(200).json(products);
});
productRouter.post("/products", (req, res) => {
    console.log(req.body);
    const newProducts = {
        id: (0, uuid_1.v4)(),
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: req.body.product_price,
    };
    products = [...products, newProducts];
    res.status(201).send("newProducts added successfully...");
});
productRouter.get("/products/:id", (req, res) => {
    const { id } = req.params;
    const foundProduct = products.find((item) => item.id === id);
    if (!foundProduct) {
        res.status(404).send("Product not found...");
    }
    res.status(200).json(foundProduct);
});
productRouter.put("/products/:id", (req, res) => {
    var _a, _b, _c;
    const { id } = req.params;
    const productIndex = products.findIndex((item) => item.id === id);
    if (productIndex !== 1) {
        const updatedProduct = Object.assign(Object.assign({}, products[productIndex]), { product_name: (_a = req.body.product_name) !== null && _a !== void 0 ? _a : products[productIndex].product_price, product_description: (_b = req.body.product_description) !== null && _b !== void 0 ? _b : products[productIndex].product_description, product_price: (_c = req.body.product_price) !== null && _c !== void 0 ? _c : products[productIndex].product_price });
        products[productIndex] = updatedProduct;
        res.status(201).json(updatedProduct);
    }
    else {
        res.status(404).send("Products not found...");
    }
});
productRouter.delete("/products/:id", (req, res) => {
    const { id } = req.params;
    const findProduct = products.find((item) => item.id === id);
    if (findProduct) {
        products = products.filter((item) => item.id !== id);
        res.status(200).send(`Product was deleted successfully...`);
    }
    else {
        res.status(404).send(`Product not found!`);
    }
});
exports.default = productRouter;
