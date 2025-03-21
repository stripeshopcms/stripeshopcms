import { Request, Response } from "express"
import { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, JWT_SECRET_KEY } from "../../../config"
import {IProduct} from "../interfaces/IProduct"
import {isAuthenticated} from "../validators/AuthValidator"
import * as jwt from "jsonwebtoken"

const stripe = require("stripe")(STRIPE_SECRET_KEY)

export async function createProduct(req, res) {
	if (!isAuthenticated(req.cookies["jwt"])) {
		return res.sendStatus(401)
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