import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1212",
  database: "apollo_typegql",
  entities: ["src/entity/*.{js,ts}"],
  logging: true,
  synchronize: true,
});

export default dataSource;
