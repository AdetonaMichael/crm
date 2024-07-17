import express from 'express';
import routes from './src/routes/crmRoutes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';

require('dotenv').config();

const PORT = process.env.PORT || 3002;
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL).then(()=>console.log('Connected to Mongodb'))
  .catch(()=>console.log('Could not Connect to Mongodb'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='JWT'){
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode)=>{
            if(err) req.user = undefined;
            req.user = decode;
            next();
        })
    }else{
        req.user = undefined;
        next();
    }
});

app.use(express.static('public'));

routes(app);

app.listen(PORT, ()=>{
    console.log(`Server Running on PORT ${PORT}`);
});