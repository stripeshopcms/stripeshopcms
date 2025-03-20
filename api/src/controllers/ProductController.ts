import { Router } from "express"
import { createProduct } from "../service/ProductService";

const products = Router()

products.post("/", createProduct)

export default products;