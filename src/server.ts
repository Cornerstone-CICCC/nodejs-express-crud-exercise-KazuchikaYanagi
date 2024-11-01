import express from "express";
import productRouter from "./routes/product.routes";

const app = express();
app.use(express.json());

app.use("/", productRouter);

app.listen(3002, () => {
  console.log(`Server is running on 3002...`);
});
