import { Request, Response } from "express"
import { JWT_SECRET_KEY } from "../../../config"
import * as jwt from "jsonwebtoken"

export async function login(req: Request, res: Response) {
	const token = jwt.sign({
		id: 1,
	}, JWT_SECRET_KEY)

	res.cookie("jwt", token, {
		httpOnly: true,
		maxAxe: 24 * 60 * 60 * 1000
	})
	
	return res.json(token)
}

export async function logout(req: Request, res: Response) {
	res.cookie("jwt", "", {
		maxAge: 0
	})
	
	return res.send("ok")
}

export async function checkAuthorization(req: Request, res: Response) {
	try {
		const cookie = req.cookies["jwt"]
		const auth = jwt.verify(cookie, JWT_SECRET_KEY)
	
		if (auth) {
			return res.status(200).json(auth)
		}
	
		return res.status(400).json({
			error: "unverified"
		})
	}
	catch {
		return res.status(400).json({ 
			error: "unverified" 
		})
	}
}
