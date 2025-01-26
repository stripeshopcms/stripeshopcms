import { AppDataSource } from "./data-source"
import * as express from "express"
import * as cors from "cors"

import products from "./controllers/ProductController"

AppDataSource.initialize().then(async () => {

    const app = express()

    app.use(express.json())
    app.use(cors({
        credentials: true,
        origin: ["https://localhost:5173"]
    }))

    app.use("/api/products", products)

    app.listen(3000, function() {
        console.log("[StripeShopCMS]: Listening on port 3000...")
    })

}).catch(error => console.log(error))
