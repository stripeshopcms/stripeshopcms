import {Router} from "express"
import { checkAuthorization, create, login, logout } from "../controllers/AuthController"

const auth = Router()

auth.get("/logout", logout)
auth.get("/", checkAuthorization)
auth.post("/login", login)
auth.post("/", create)

export default auth;