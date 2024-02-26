import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavorite,
} from "../controllers/contactsControllers.js";
import { ValidId } from "../helpers/ValidId.js";
import { authenticate } from "../auth/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.get("/:id", authenticate, ValidId, getOneContact);

contactsRouter.delete("/:id", authenticate, ValidId, deleteContact);

contactsRouter.post("/", authenticate, createContact);

contactsRouter.put("/:id", authenticate, ValidId, updateContact);

contactsRouter.patch("/:id/favorite", authenticate, ValidId, updateFavorite);

export default contactsRouter;
