import { Request, Response } from "express"
import { JWT_SECRET_KEY } from "../../../config"
import * as jwt from "jsonwebtoken"
import {User} from "../entities/UserEntity"
import {AppDataSource} from "../index"

export async function create(req: Request, res: Response) {
	const user: User = req.body;
	await AppDataSource.manager.save(user);
	return res.sendStatus(200)
}

export async function login(req: Request, res: Response) {
	const token = jwt.sign({
		id: 1,
		roles: ["StripeAdmin"]
	}, JWT_SECRET_KEY)

	res.cookie("jwt", token, {
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000
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
