import express from "express";
import {
  register,
  login,
  logout,
  updateUserSubscription,
  getCurrent,
} from "../auth/usersControllers.js";
import { authenticate } from "../auth/authenticate.js";

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/current", authenticate, getCurrent);
usersRouter.post("/logout", authenticate, logout);
usersRouter.patch("/users", authenticate, updateUserSubscription);


export default usersRouter;
