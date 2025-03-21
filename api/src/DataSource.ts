import "reflect-metadata"
import { DataSource } from "typeorm"
import {User} from "./entities/User"

export const AppDataSource = new DataSource({
	type: "sqlite",
	database: "stripeshopcms.db",
	synchronize: true,
	logging: false,
	entities: [User],
	migrations: [],
	subscribers: [],
})
