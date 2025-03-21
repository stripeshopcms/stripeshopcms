import {JWT_SECRET_KEY} from "../../../config"
import * as jwt from "jsonwebtoken"

export function isStripeAdmin(cookie: string): boolean {
	try {
		const auth = jwt.verify(cookie, JWT_SECRET_KEY)
		if (auth.roles.includes("StripeAdmin")) {
			return true;
		}
		return false;
	}
	catch {
		return false;
	}
}