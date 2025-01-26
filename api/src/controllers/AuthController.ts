import {Router} from "express"
import { checkAuthorization, login, logout } from "../service/AuthService"

const auth = Router()

auth.get("/login", login)
auth.get("/logout", logout)
auth.get("/", checkAuthorization)

export default auth;