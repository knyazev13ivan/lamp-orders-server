import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import {
  registerValidation,
  loginValidation,
  orderInLineCreateValidation,
} from "./validations.js";

import { handleValidationErrors, checkAuth } from "./utils/index.js";
import { UserController, OrderInLineController } from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://admin:lampadmin@cluster0.a1mukxo.mongodb.net/lamps?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database OK"))
  .catch((err) => console.log("Database ERROR", err));

const app = express();

app.use(express.json());
app.use(cors());

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/orders-in-line", OrderInLineController.getAll);
app.post(
  "/orders-in-line",
  checkAuth,
  orderInLineCreateValidation,
  handleValidationErrors,
  OrderInLineController.create
);
app.delete("/orders-in-line/:id", checkAuth, OrderInLineController.remove);

app.listen(3001, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server ok");
});
