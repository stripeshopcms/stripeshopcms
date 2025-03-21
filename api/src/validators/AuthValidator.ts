import {JWT_SECRET_KEY} from "../../../config"
import * as jwt from "jsonwebtoken"

export function isAuthenticated(cookie: string): boolean {
	try {
		const auth = jwt.verify(cookie, JWT_SECRET_KEY)
		return !!auth;
	}
	catch(error) {
		return false;
	}
}