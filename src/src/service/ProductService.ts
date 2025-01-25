import { Request, Response } from "express"
import { STRIPE_PUBLISHABLE_KEY } from "../../../config"

export function createProduct(req: Request, res: Response) {
    res.send(STRIPE_PUBLISHABLE_KEY)
}