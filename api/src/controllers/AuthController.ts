import {Router} from "express"
import { checkAuthorization, login, logout } from "../service/AuthService"

const auth = Router()

auth.get("/logout", logout)
auth.get("/", checkAuthorization)
auth.post("/login", login)

export default auth;