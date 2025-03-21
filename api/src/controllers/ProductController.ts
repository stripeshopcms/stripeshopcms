import { Request, Response } from "express"
import { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, JWT_SECRET_KEY } from "../../../config"
import {IProduct} from "../models/IProduct"
import {isStripeAdmin} from "../validators/AuthValidator"
import * as jwt from "jsonwebtoken"

const stripe = require("stripe")(STRIPE_SECRET_KEY)

export async function createProduct(req, res) {
	if (!isStripeAdmin(req.cookies["jwt"])) {
		return res.status(401).send("unauthorized")
	}
	
	const product: IProduct = req.body;
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