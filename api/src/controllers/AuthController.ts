import { JWT_SECRET_KEY } from "../../../config"
import { Users } from "../entities/Users"
import { IUser } from "../models/IUser"
import {AppDataSource} from "../DataSource"
import * as jwt from "jsonwebtoken"

const userRepository = AppDataSource.getRepository(Users);

export async function create(req, res) {
	const user: IUser = req.body;

	const newUser: Users = userRepository.create({
		email: user.email,
		password: user.password
	})

	await AppDataSource.manager.save(newUser);
	return res.json(user);
}

export async function login(req, res) {
	const user: IUser = req.body;

	const foundUser = await userRepository.findOneBy({
		email: user.email,
		password: user.password
	})

	const token = jwt.sign({
		id: foundUser.id
	}, JWT_SECRET_KEY)

	res.cookie("jwt", token, {
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000
	})
	
	return res.sendStatus(200)
}

export async function logout(req, res) {
	res.cookie("jwt", "", {
		maxAge: 0
	})
	
	return res.sendStatus(200)
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
