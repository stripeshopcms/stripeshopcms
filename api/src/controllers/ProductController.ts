import { Request, Response } from "express"
import { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, JWT_SECRET_KEY } from "../../../config"
import {Product} from "../models/Product"
import {isStripeAdmin} from "../validators/AuthValidator"
import * as jwt from "jsonwebtoken"

const stripe = require("stripe")(STRIPE_SECRET_KEY)

export async function createProduct(req: Request, res: Response) {
  if (!isStripeAdmin(req.cookies["jwt"])) {
    return res.status(401).send("unauthorized")
  }

  const product: Product = req.body;
  const createdProduct = await stripe.products.create({
    name: product.name,
    description: product.description,
    default_price_data: {
      unit_amount: product.price,
      currency: 'usd'
    },
    expand: ['default_price']
  })
  
  return res.json(createdProduct);
}