import { STRIPE_SECRET_KEY } from "../../../config"
import {IProduct} from "../interfaces/IProduct"
import {isAuthenticated} from "../validators/AuthValidator"

const stripe = require("stripe")(STRIPE_SECRET_KEY)

export async function getAllProducts(req, res) {
	const products = await stripe.products.list({
		active: true
	})
	return res.json(products);
}

export async function findProduct(req, res) {
	try {
		const productId = req.params["productId"]
		const product = await stripe.products.retrieve(productId)
		return res.json(product)
	}
	catch(err) {
		res.sendStatus(404)
	}
}

export async function createProduct(req, res) {
	if (!isAuthenticated(req.cookies["jwt"])) {
		return res.sendStatus(401)
	}
	
	const product: IProduct = req.body
	const createdProduct = await stripe.products.create({
		name: product.name,
		description: product.description,
		expand: ['default_price']
	})
	
	return res.json(createdProduct);
}

export async function updateProduct(req, res) {
	try {
		if (!isAuthenticated(req.cookies["jwt"])) {
			return res.sendStatus(401)
		}
	
		const productId = req.params["productId"];
		const product: IProduct = req.body
	
		const updatedProduct = await stripe.products.update(productId, {
			name: product.name,
			description: product.description
		})
	
		return res.json(updatedProduct);
	}
	catch (err) {
		res.sendStatus(404)
	}
}

export async function deleteProduct(req, res) {
	try {
		if (!isAuthenticated(req.cookies["jwt"])) {
			return res.sendStatus(401)
		}
	
		const productId = req.params["productId"];
		await stripe.products.del(productId); 
	
		return res.sendStatus(200)
	}
	catch (err) {
		res.sendStatus(404)
	}
}