import { JWT_SECRET_KEY } from "../../../config"
import { Users } from "../entities/Users"
import { IUser } from "../interfaces/IUser"
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

	if (foundUser === null) {
		return res.sendStatus(400);
	}

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
