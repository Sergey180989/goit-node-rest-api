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

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", ValidId, getOneContact);

contactsRouter.delete("/:id", ValidId, deleteContact);

contactsRouter.post("/", createContact);

contactsRouter.put("/:id", ValidId, updateContact);

contactsRouter.patch("/:id/favorite", ValidId, updateFavorite);

export default contactsRouter;
