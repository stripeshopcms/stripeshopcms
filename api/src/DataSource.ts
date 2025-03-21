import "reflect-metadata"
import { DataSource } from "typeorm"
import {Users} from "./entities/Users"

export const AppDataSource = new DataSource({
	type: "sqlite",
	database: "stripeshopcms.db",
	synchronize: true,
	logging: false,
	entities: [Users],
	migrations: [],
	subscribers: [],
})
