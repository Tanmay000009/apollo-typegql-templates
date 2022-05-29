import * as express from "express";
import { Request, Response } from "express";
import { User } from "./entity/user.entity";
import data_source from "../app-data-source";

// establish database connection
data_source
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

// create and setup express app
const app = express();
app.use(express.json());

// register routes
app.get("/users", async function (req: Request, res: Response) {
  const users = await data_source.getRepository(User).find();
  res.json(users);
});

app.get("/users/:id", async function (req: Request, res: Response) {
  const results = await data_source.getRepository(User).findOneBy({
    id: parseInt(req.params.id),
  });
  return res.send(results);
});

app.post("/users", async function (req: Request, res: Response) {
  const user = await data_source.getRepository(User).create(req.body);
  const results = await data_source.getRepository(User).save(user);
  return res.send(results);
});

app.put("/users/:id", async function (req: Request, res: Response) {
  const user = await data_source.getRepository(User).findOneBy({
    id: parseInt(req.params.id),
  });
  data_source.getRepository(User).merge(user, req.body);
  const results = await data_source.getRepository(User).save(user);
  return res.send(results);
});

app.delete("/users/:id", async function (req: Request, res: Response) {
  const results = await data_source.getRepository(User).delete(req.params.id);
  return res.send(results);
});

// start express server
app.listen(3000);
