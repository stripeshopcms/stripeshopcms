import { AppDataSource } from "./DataSource"
import * as cookieParser from "cookie-parser"
import * as express from "express"
import * as cors from "cors"

import products from "./routers/ProductRouter"
import auth from "./routers/AuthRouter"

AppDataSource.initialize().then(async () => {

	const app = express()

	app.use(cookieParser())
	app.use(express.json())
	app.use(cors({
		credentials: true,
		origin: ["https://localhost:5173"]
	}))

	app.use("/api/products", products)
	app.use("/api/auth", auth)

	app.listen(3000, function() {
		console.log("[StripeShopCMS]: Listening on port 3000...")
	})

}).catch(error => console.log(error))
