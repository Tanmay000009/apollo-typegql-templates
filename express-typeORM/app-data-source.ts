import { DataSource } from "typeorm";

const myDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1212",
  database: "express_typeorm",
  entities: ["src/entity/*.js"],
  logging: true,
  synchronize: true,
});

export default myDataSource;
