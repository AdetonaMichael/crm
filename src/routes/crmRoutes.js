const routes = (app) =>{
    app.get('/contact', (req, res, next)=>{
        console.log(`Request from ${req.originalUrl}`);
        console.log(`Request Type: ${req.method}`);
        next();
    } , (req, res, next)=>{
        res.send(`Get REsponse with middleware successful...`);
    });

    app.get('/contact/:contactId',(req, res)=>{
        res.send(`GET INDIVIDUAL WORKING`);
    })

    app.post('/contact', (req, res)=>{
        res.send(`POST END POINT RUNNING SUCCESSFULLY...`);
    })

    app.put('/contact/:contactId', (req, res)=>{
       res.send(`PUT REQUEST RUNNING SUCCESSFULLY...`);
    });

    app.delete('/contact/:contactId', (req, res)=>{
        res.send(`DELETE REQUEST RUNNING SUCCESSFULLY...`);
    });
    
}

export default routes;