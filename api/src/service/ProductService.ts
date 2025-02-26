import { Request, Response } from "express"
import { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } from "../../../config"

const stripe = require("stripe")(STRIPE_SECRET_KEY)

export async function createProduct(req: Request, res: Response) {
	const product = await stripe.products.create({
		name: "Nike Shoes",
		description: "Comfortable Nike Shoes",
		default_price_data: {
			unit_amount: 10000,
			currency: 'usd'
		},
		expand: ['default_price']
	})
	
	const paymentLink = await stripe.paymentLinks.create({
		line_items: [
			{
				price: product.default_price.id,
				quantity: 1
			}
		],
		after_completion: {
			type: "redirect",
			redirect: {
				url: "http://localhost:3000"
			}
		}
	})
	return res.json(paymentLink)
}