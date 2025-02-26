import { Request, Response } from "express"
import { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } from "../../../config"

const stripe = require("stripe")(STRIPE_SECRET_KEY)

export async function createProduct(req: Request, res: Response) {
	const product = await stripe.products.create({
		name: "Second test product",
		description: "This is a second test product.",
	})
	const price = await stripe.prices.create({
		product: product.id,
		currency: 'cad',
		unit_amount: 1000,
	})
	const product2 = await stripe.products.create({
		name: "test product",
		description: "This is a test product.",
	})
	const price2 = await stripe.prices.create({
		product: product2.id,
		currency: 'cad',
		unit_amount: 2000,
	})
	const paymentLink = await stripe.paymentLinks.create({
		line_items: [
			{
				price: price.id,
				quantity: 1
			},
			{
				price: price2.id,
				quantity: 2
			}
		]
	})
	return res.json(paymentLink)
}