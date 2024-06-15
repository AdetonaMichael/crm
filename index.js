import express from 'express';
import routes from './src/routes/crmRoutes';
import mongoose, { mongo } from 'mongoose';
import bodyParser from 'body-parser';

const PORT = 3001;
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb',{
    useNewUrlParser:true
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static('public'));

routes(app);

app.listen(PORT, ()=>{
    console.log(`Server Running on PORT ${PORT}`);
});