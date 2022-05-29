"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var myDataSource = new typeorm_1.DataSource({
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
exports.default = myDataSource;
