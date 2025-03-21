import { JWT_SECRET_KEY } from "../../../config"
import * as jwt from "jsonwebtoken"
import {UserEntity} from "../entities/UserEntity"
import { User } from "../models/User"
import {AppDataSource} from "../DataSource"

export async function create(req, res) {
	const user: User = req.body;
	const ue: UserEntity = new UserEntity;
	ue.email = user.email;
	ue.password = user.password;
	await AppDataSource.manager.save(ue);
	return res.json(ue);
}

export async function login(req, res) {
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

export async function logout(req, res) {
	res.cookie("jwt", "", {
		maxAge: 0
	})
	
	return res.send("ok")
}

export async function checkAuthorization(req, res) {
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
