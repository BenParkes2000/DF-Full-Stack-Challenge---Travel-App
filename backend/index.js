import { config } from "dotenv";
import { connectToDB } from "./db/connection.js";
import cors from "cors";
import express from "express";

import { router as loginRouter } from "./routes/login.route.js";
import { router as createUserRouter } from "./routes/createUser.route.js";
import { router as updateFavouritesRouter } from "./routes/updateFavourites.route.js";

config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();

app.use(express.json());
app.use(cors());
app.use(`/login`, loginRouter);
app.use(`/create`, createUserRouter);
app.use(`/favourite`, updateFavouritesRouter);

try {
  console.log(`Connecting to DB @ ${process.env.DB_URI}`);
  await connectToDB(process.env.DB_URI);
  console.log(`Connected to DB @ ${process.env.DB_URI}`);
} catch (error) {
  console.log(error);
}

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on: ${process.env.PORT}`
    // ${server.address().address}:${server.address().port}`
  );
});

export default server;
