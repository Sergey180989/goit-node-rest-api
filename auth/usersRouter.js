import express from "express";
import {
  register,
  login,
  logout,
  verifyEmail,
  resendverifyEmail,
  updateUserSubscription,
  getCurrent,
  updateAvatar,
} from "../auth/usersControllers.js";
import { authenticate } from "../auth/authenticate.js";
import { upload } from "../ava/upload.js";

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/current", authenticate, getCurrent);
usersRouter.post("/logout", authenticate, logout);
usersRouter.patch("/users", authenticate, updateUserSubscription);
usersRouter.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);
usersRouter.get("/verify/:verificationToken", verifyEmail);
usersRouter.post("/verify", resendverifyEmail);


export default usersRouter;
