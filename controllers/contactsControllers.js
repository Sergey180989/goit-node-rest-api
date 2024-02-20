import { Contacts } from "../db/contacts.js";
import HttpError from "../helpers/HttpError.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";
import mongoose from "mongoose";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contacts.find();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw HttpError(400, "Invalid contact ID");
    }
    const contact = await Contacts.findById(id);
    if (!contact) {
      throw HttpError(404, `Not Found, Contact with id=${id} not found`);
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contacts.findByIdAndDelete(id);
    if (!deletedContact) {
      throw HttpError(404, `Not Found, Contact with id=${id} not found`);
    }
    res.status(200).json(deletedContact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const newContact = await Contacts.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw HttpError(400, "Invalid contact ID");
    }
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    
    const updatedContact = await Contacts.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedContact) {
      throw HttpError(404, `Not Found, Contact with id=${id} not found`);
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

export const updateFavorite = async (req, res, next) => {
  try {
    if (!("favorite" in req.body)) {
      throw HttpError(400, "Missing field favorite");
    }
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const updatedContact = await Contacts.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedContact) {
      throw HttpError(404, `Not Found, Contact with id=${id} not found`);
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};
