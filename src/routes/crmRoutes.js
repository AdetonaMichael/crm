import { addNewContact, getContactWithID, getContacts, updateContact, deleteContact } from "../controllers/crmControllers";
import { login, register, loginRequired } from "../controllers/userController";

const routes = (app) => {
    app.get('/contact', (req, res, next) => {
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request Type: ${req.method}`);
        next();
    }, loginRequired, getContacts);

    app.get('/contact/:contactId', loginRequired, getContactWithID);

    app.post('/contact', loginRequired, addNewContact);

    app.put('/contact/:contactId', loginRequired, updateContact);

    app.delete('/contact/:contactId', loginRequired, deleteContact);

    app.route('/register').post(register);

    app.route('/login').post(login);

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
};

export default routes;
