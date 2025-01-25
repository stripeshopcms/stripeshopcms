import { Request, Response } from "express"
import { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } from "../../../config"

const stripe = require("stripe")(STRIPE_SECRET_KEY)

export async function createProduct(req: Request, res: Response) {
    const product = await stripe.products.create({
        name: "Second test product",
        description: "This is a second test product.",
        default_price_data: {
            unit_amount: 1000,
            currency: 'CAD'
        }
    })
    const paymentLink = await stripe.paymentLinks.create({
        line_items: [
            {
                price: product.default_price,
                quantity: 1
            }
        ]
    })
    return res.json(paymentLink)
}