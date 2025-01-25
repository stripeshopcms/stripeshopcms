import { Router } from "express"
import { createProduct } from "../service/ProductService";

const products = Router()

products.get("/", createProduct)

export default products;