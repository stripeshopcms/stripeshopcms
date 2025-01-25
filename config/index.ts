import * as path from "path";
import { configDotenv } from "dotenv";

if (typeof process !== "undefined") {
    const mode = (process.argv[2] == "personal" ? "personal" 
    : (process.argv[2] || process.env.NODE_ENV) == "dev" ? "dev" : "prod")
    configDotenv({path: path.resolve(__dirname, `../.env.${mode}`)})
}

export const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;