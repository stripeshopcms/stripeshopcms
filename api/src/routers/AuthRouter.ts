import {Router} from "express"
import { checkAuthorization, login, logout } from "../service/AuthController"

const auth = Router()

auth.get("/logout", logout)
auth.get("/", checkAuthorization)
auth.post("/login", login)

export default auth;