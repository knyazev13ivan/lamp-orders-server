import express from "express";
import mongoose from "mongoose";

import { validationResult } from "express-validator";

import {
  registerValidation,
  loginValidation,
  ordersInLineCreateValidation,
} from "./validations.js";

import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController";

mongoose
  .connect(
    "mongodb+srv://admin:lampadmin@cluster0.a1mukxo.mongodb.net/lamps?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database OK"))
  .catch((err) => console.log("Database ERROR", err));

const app = express();

app.use(express.json());

app.post("/auth/login", loginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.listen(3001, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server ok");
});
