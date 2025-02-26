import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
	type: "sqlite",
	database: "stripeshopcms.db",
	synchronize: true,
	logging: false,
	entities: [User],
	migrations: [],
	subscribers: [],
})
