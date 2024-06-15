import mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = async (req, res) => {
    const newContact = new Contact(req.body);

    try {
        const contact = await newContact.save();
        res.status(201).json(contact);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const getContactWithID = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.contactId);
        if (contact) {
            res.status(200).json(contact);
        } else {
            res.status(404).send('Contact not found');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findOneAndUpdate(
            { _id: req.params.contactId },
            req.body,
            { new: true, useFindAndModify: false } 
        );

        if (contact) {
            res.status(200).json(contact);
        } else {
            res.status(404).send('Contact not found');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.deleteOne(
            {_id:req.params.contactId}, 
            { useFindAndModify: false }
        );

        if (contact) {
            res.status(200).json({ message: 'Contact successfully deleted' });
        } else {
            res.status(404).send('Contact not found');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};