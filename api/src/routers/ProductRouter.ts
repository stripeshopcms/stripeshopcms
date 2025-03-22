import { Router } from "express"
import { createProduct, updateProduct, deleteProduct, getAllProducts, findProduct } from "../controllers/ProductController";

const products = Router()

products.get("/", getAllProducts)
products.get("/:productId", findProduct)
products.post("/", createProduct)
products.put("/:productId", updateProduct)
products.delete("/:productId", deleteProduct)

export default products;