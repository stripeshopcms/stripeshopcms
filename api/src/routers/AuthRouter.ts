import {Router} from "express"
import { create, login, logout } from "../controllers/AuthController"

const auth = Router()

auth.post("/", create)
auth.post("/login", login)
auth.delete("/logout", logout)

export default auth;