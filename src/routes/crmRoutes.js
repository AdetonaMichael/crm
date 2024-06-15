import { addNewContact, getContactWithID, getContacts, updateContact, deleteContact } from "../controllers/crmControllers";


const routes = (app) => {
    app.get('/contact', (req, res, next) => {
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request Type: ${req.method}`);
        next();
    }, getContacts);

   

    app.get('/contact/:contactId', getContactWithID);

    app.post('/contact', addNewContact);

    app.put('/contact/:contactId', updateContact);
    

    app.delete('/contact/:contactId', deleteContact);

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
}

export default routes;