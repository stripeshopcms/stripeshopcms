import { JWT_SECRET_KEY } from "../../../config"
import * as jwt from "jsonwebtoken"
import { Users } from "../entities/Users"
import { UserModel } from "../models/UserModel"
import {AppDataSource} from "../DataSource"

const userRepository = AppDataSource.getRepository(Users);

export async function create(req, res) {
	const {email, password} = req.body;

	const user: Users = userRepository.create({
		email: email,
		password: password
	})

	await AppDataSource.manager.save(user);
	return res.json(user);
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
