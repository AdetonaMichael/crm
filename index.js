import express from 'express';
import routes from './src/routes/crmRoutes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';

const PORT = 3000;
const app = express();

mongoose.Promise = global.Promise;

routes(app);

app.listen(PORT, ()=>{
    console.log(`Server Running on PORT ${PORT}`);
});