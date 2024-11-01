import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Product, ProductRequestBody } from "../types/product";

const productRouter = Router();

let products: Product[] = [];

productRouter.get("/products", (req: Request, res: Response) => {
  res.status(200).json(products);
});

productRouter.post(
  "/products",
  (req: Request<{}, {}, ProductRequestBody>, res: Response) => {
    console.log(req.body);
    const newProducts: Product = {
      id: uuidv4(),
      product_name: req.body.product_name,
      product_description: req.body.product_description,
      product_price: req.body.product_price,
    };
    products = [...products, newProducts];
    res.status(201).send("newProducts added successfully...");
  }
);

productRouter.get(
  "/products/:id",
  (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const foundProduct = products.find((item) => item.id === id);
    if (!foundProduct) {
      res.status(404).send("Product not found...");
    }
    res.status(200).json(foundProduct);
  }
);

productRouter.put("/products/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const productIndex = products.findIndex((item) => item.id === id);
  if (productIndex !== 1) {
    const updatedProduct = {
      ...products[productIndex],
      product_name:
        req.body.product_name ?? products[productIndex].product_price,
      product_description:
        req.body.product_description ??
        products[productIndex].product_description,
      product_price:
        req.body.product_price ?? products[productIndex].product_price,
    };
    products[productIndex] = updatedProduct;
    res.status(201).json(updatedProduct);
  } else {
    res.status(404).send("Products not found...");
  }
});

productRouter.delete(
  "/products/:id",
  (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const findProduct = products.find((item) => item.id === id);
    if (findProduct) {
      products = products.filter((item) => item.id !== id);
      res.status(200).send(`Product was deleted successfully...`);
    } else {
      res.status(404).send(`Product not found!`);
    }
  }
);

export default productRouter;
