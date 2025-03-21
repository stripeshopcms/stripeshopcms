import { Router } from "express"
import { createProduct } from "../service/ProductController";

const products = Router()

products.post("/", createProduct)

export default products;