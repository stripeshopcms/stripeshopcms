import { Router } from "express"
import { createProduct } from "../controllers/ProductController";

const products = Router()

products.post("/", createProduct)

export default products;